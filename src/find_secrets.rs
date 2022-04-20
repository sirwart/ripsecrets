use std::cmp;
use std::error::Error;
use std::path::PathBuf;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

use grep::printer;
use grep::searcher::Searcher;
use ignore::WalkBuilder;
use termcolor::{BufferWriter, ColorChoice};

use crate::ignore_info;
use crate::matcher;

fn predefined_secret_regexes() -> Vec<&'static str> {
    return vec![
        "(?:r|s)k_live_[0-9a-zA-Z]{24}",            // stripe
        "(?:AC[a-z0-9]{32}|SK[a-z0-9]{32})",        // twilio
        "(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{36}", // github
        "(?:^|\\W)eyJ[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*?", // jwt
        "xox(?:a|b|p|o|s|r)-(?:\\d+-)+[a-z0-9]+",   // slack
        "https://hooks\\.slack\\.com/services/T[a-zA-Z0-9_]+/B[a-zA-Z0-9_]+/[a-zA-Z0-9_]+", // slack webhooks
        "//.+/:_authToken=[A-Zaz0-9-_]+",             // legacy npm
        "npm_[A-Za-z0-9]{36}",                        // modern npm tokens
        "AccountKey=[a-zA-Z0-9+/=]{88}",              // azure storage
        "SG\\.[a-zA-Z0-9_-]{22}\\.[a-zA-Z0-9_-]{43}", // sendgrid
        "[0-9a-z]{32}-us[0-9]{1,2}",                  // mailchimp
        r#"sq0csp-[0-9A-Za-z\\\-_]{43}"#,             // square
        "AIzaSy[A-Za-z0-9-_]{33}",                    // gcp api key
        // Private keys
        "-----BEGIN DSA PRIVATE KEY-----(?:$|[^-]{63}[^-]*-----END)",
        "-----BEGIN EC PRIVATE KEY-----(?:$|[^-]{63}[^-]*-----END)",
        "-----BEGIN OPENSSH PRIVATE KEY-----(?:$|[^-]{63}[^-]*-----END)",
        "-----BEGIN PGP PRIVATE KEY BLOCK-----(?:$|[^-]{63}[^-]*-----END)",
        "-----BEGIN PRIVATE KEY-----(?:$|[^-]{63}[^-]*-----END)",
        "-----BEGIN RSA PRIVATE KEY-----(?:$|[^-]{63}[^-]*-----END)",
        "-----BEGIN SSH2 ENCRYPTED PRIVATE KEY-----(?:$|[^-]{63}[^-]*-----END)",
        "PuTTY-User-Key-File-2",
        matcher::RANDOM_STRING_REGEX,
    ];
}

fn combined_regex(regexes: &[&str]) -> String {
    let mut combined = String::from("(");
    for secret_regex in regexes {
        if combined.len() > 1 {
            combined.push('|');
        }
        combined.push_str(secret_regex);
    }
    combined.push(')');
    combined
}

pub fn find_secrets(paths: &[PathBuf]) -> Result<usize, Box<dyn Error>> {
    let predefined = predefined_secret_regexes();
    let combined = combined_regex(&predefined);

    let ignore_info = ignore_info::get_ignore_info()?;

    let matcher = matcher::IgnoringMatcher::new(&combined, ignore_info.ignore_secrets)?;

    let match_count = Arc::new(AtomicUsize::new(0));
    let match_count_result = match_count.clone();

    let bufwtr = Arc::new(BufferWriter::stdout(ColorChoice::Never));

    // Don't love this, but it works
    let mut walk_builder = WalkBuilder::new(&paths[0]);
    if paths.len() > 1 {
        for path in &paths[1..paths.len()] {
            walk_builder.add(path);
        }
    }
    if ignore_info.ignore_file_path.is_some() {
        walk_builder.add_ignore(ignore_info.ignore_file_path.unwrap());
    }

    let parallel_walker = walk_builder
        .threads(cmp::min(12, num_cpus::get()))
        .build_parallel();

    parallel_walker.run(move || {
        let bufwtr = bufwtr.clone();
        let mut printer = printer::Standard::new(bufwtr.buffer());
        let matcher = matcher.clone();
        let mut searcher = Searcher::new();
        let match_count_result = match_count_result.clone();

        Box::new(move |result| {
            let entry = match result {
                Err(err) => {
                    eprintln!("{}", err);
                    return ignore::WalkState::Continue;
                }
                Ok(dent) => {
                    if !dent.file_type().map_or(false, |ft| ft.is_file()) {
                        return ignore::WalkState::Continue;
                    }
                    dent
                }
            };
            printer.get_mut().clear();
            let mut sink = printer.sink_with_path(&matcher, entry.path());
            let result = searcher.search_path(&matcher, entry.path(), &mut sink);
            if sink.match_count() > 0 {
                let match_count_result = match_count_result.clone();
                let file_match_count = sink.match_count() as usize;
                (*match_count_result).fetch_add(file_match_count, Ordering::SeqCst);
            }
            if let Err(err) = result {
                eprintln!("{}: {}", entry.path().display(), err);
            } else if let Err(err) = bufwtr.print(printer.get_mut()) {
                eprintln!("{}: {}", entry.path().display(), err);
            }

            ignore::WalkState::Continue
        })
    });

    Ok(match_count.fetch_max(0, Ordering::SeqCst))
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;

    #[test]
    fn no_false_positives() {
        let res = find_secrets(&[PathBuf::from("test/none")]);
        assert_eq!(res.unwrap(), 0)
    }

    #[test]
    fn no_false_negatives() {
        for maybe_entry in fs::read_dir("test/one_per_line").unwrap() {
            let entry = maybe_entry.unwrap();
            let contents = fs::read_to_string(entry.path()).unwrap();
            let res = find_secrets(&[entry.path()]);
            assert_eq!(
                res.unwrap(),
                contents.matches("\n").count(),
                "{:?}",
                entry.file_name()
            );
        }
        for maybe_entry in fs::read_dir("test/one").unwrap() {
            let entry = maybe_entry.unwrap();
            let res = find_secrets(&[entry.path()]);
            assert_eq!(res.unwrap(), 1, "{:?}", entry.file_name());
        }
    }
}
