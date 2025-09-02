#![allow(clippy::needless_return)]

use std::cmp;
use std::error::Error;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

use grep::printer;
use grep::searcher::Searcher;
use ignore::gitignore::Gitignore;
use ignore::WalkBuilder;
use termcolor::BufferWriter;

#[cfg(test)]
use termcolor::ColorChoice;

mod ignore_info;
mod matcher;

fn predefined_secret_regexes() -> Vec<&'static str> {
    return vec![
        r"[A-Za-z]+://\S{3,50}:(\S{8,50})@[\dA-Za-z#%&+./:=?_~-]+", // URL
        r"\beyJ[\dA-Za-z=_-]+(?:\.[\dA-Za-z=_-]{3,}){1,4}",         // JWT/JWE
        r"(?:gh[oprsu]|github_pat)_[\dA-Za-z_]{36}",                // GitHub
        r"glpat-[\dA-Za-z_=-]{20,22}",                              // GitLab
        r"[rs]k_live_[\dA-Za-z]{24,247}",                           // Stripe
        r"sq0i[a-z]{2}-[\dA-Za-z_-]{22,43}",                        // Square
        r"sq0c[a-z]{2}-[\dA-Za-z_-]{40,50}",                        // Square
        r"EAAA[\dA-Za-z+=-]{60}",                                   // Square
        r"AccountKey=[\d+/=A-Za-z]{88}",                            // Azure Storage
        r"AIzaSy[\dA-Za-z_-]{33}",                                  // GCP API Key
        r"npm_[\dA-Za-z]{36}",                                      // npm (modern)
        r"//.+/:_authToken=[\dA-Za-z_-]+",                          // npm (legacy)
        r"xox[aboprs]-(?:\d+-)+[\da-z]+",                           // Slack
        r"<master>\{[\dA-Za-z]+\\}</master>",                       // Maven
        r"https://hooks\.slack\.com/services/T[\dA-Za-z_]+/B[\dA-Za-z_]+/[\dA-Za-z_]+", // Slack Webhooks
        r"SG\.[\dA-Za-z_-]{22}\.[\dA-Za-z_-]{43}",                                      // SendGrid
        r"(?:AC|SK)[\da-z]{32}",                                                        // Twilio
        r"[\da-f]{32}-us\d{1,2}",                                                       // Mailchimp
        r"s-s4t2(?:af|ud)-[\da-f]{64}",                                                 // Intra42
        "PuTTY-User-Key-File-2",
        // Private keys
        r"AGE-SECRET-KEY-1[\dA-Z]{58}", // age secret key
        "-{5}BEGIN DSA PRIVATE KEY-{5}(?:$|[^-]{63,}-{5}END)",
        "-{5}BEGIN EC PRIVATE KEY-{5}(?:$|[^-]{63,}-{5}END)",
        "-{5}BEGIN OPENSSH PRIVATE KEY-{5}(?:$|[^-]{63,}-{5}END)",
        "-{5}BEGIN PGP PRIVATE KEY BLOCK-{5}(?:$|[^-]{63,}-{5}END)",
        "-{5}BEGIN PRIVATE KEY-{5}(?:$|[^-]{63,}-{5}END)",
        "-{5}BEGIN RSA PRIVATE KEY-{5}(?:$|[^-]{63,}-{5}END)",
        "-{5}BEGIN SSH2 ENCRYPTED PRIVATE KEY-{5}(?:$|[^-]{63,}-{5}END)",
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

pub fn find_secrets(
    paths: &[PathBuf],
    additional_patterns: &[String],
    strict_ignore: bool,
    only_matching: bool,
    writer: BufferWriter,
) -> Result<usize, Box<dyn Error>> {
    let predefined_patterns = predefined_secret_regexes();

    let mut all_patterns: Vec<&str> =
        Vec::with_capacity(predefined_patterns.len() + additional_patterns.len());
    all_patterns.extend(predefined_patterns.iter());
    for p in additional_patterns {
        all_patterns.push(p.as_str());
    }

    let combined = combined_regex(&all_patterns);

    let ignore_info = ignore_info::get_ignore_info()?;

    let matcher = matcher::IgnoringMatcher::new(&combined, ignore_info.ignore_secrets)?;

    let match_count = Arc::new(AtomicUsize::new(0));
    let match_count_result = match_count.clone();

    let bufwtr = Arc::new(writer);

    let mut to_search = Vec::<PathBuf>::new();
    if strict_ignore && ignore_info.ignore_matcher.is_some() {
        let ignore_matcher = ignore_info.ignore_matcher.unwrap();
        for path in paths {
            if !is_ignored(path, &ignore_matcher) {
                to_search.push(path.clone());
            }
        }
    } else {
        for path in paths {
            to_search.push(path.clone());
        }
    }

    if to_search.is_empty() {
        return Ok(0);
    }

    let mut walk_builder = WalkBuilder::new(&to_search[0]);
    for additional_path in &to_search[1..] {
        walk_builder.add(additional_path);
    }
    if ignore_info.ignore_file_path.is_some() {
        walk_builder.add_custom_ignore_filename(ignore_info.ignore_file_path.unwrap());
    }

    let parallel_walker = walk_builder
        .threads(cmp::min(12, num_cpus::get()))
        .build_parallel();

    parallel_walker.run(move || {
        let bufwtr = bufwtr.clone();

        let mut printer_builder = printer::StandardBuilder::new();
        printer_builder.only_matching(only_matching);
        let mut printer = printer_builder.build(bufwtr.buffer());

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
                    if !dent.file_type().is_some_and(|ft| ft.is_file()) {
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

fn is_ignored(path: &Path, ignore_matcher: &Gitignore) -> bool {
    if let Some(parent) = path.parent() {
        let parent_ignored = is_ignored(parent, ignore_matcher);
        if parent_ignored {
            return true;
        }
    }
    if let Ok(metadata) = fs::metadata(path) {
        let is_dir = metadata.is_dir();
        if ignore_matcher.matched(path, is_dir).is_ignore() {
            return true;
        }
    }
    return false;
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;

    #[test]
    fn no_false_positives() {
        let res = find_secrets(
            &[PathBuf::from("test/none")],
            &[],
            false,
            false,
            BufferWriter::stdout(ColorChoice::Never),
        );
        assert_eq!(res.unwrap(), 0)
    }

    #[test]
    fn no_false_negatives() {
        for maybe_entry in fs::read_dir("test/one_per_line").unwrap() {
            let entry = maybe_entry.unwrap();
            let contents = fs::read_to_string(entry.path()).unwrap();
            let res = find_secrets(
                &[entry.path()],
                &[],
                false,
                false,
                BufferWriter::stdout(ColorChoice::Never),
            );
            assert_eq!(
                res.unwrap(),
                contents.matches('\n').count(),
                "{:?}",
                entry.file_name()
            );
        }
        for maybe_entry in fs::read_dir("test/one_per_file").unwrap() {
            let entry = maybe_entry.unwrap();
            let res = find_secrets(
                &[entry.path()],
                &[],
                false,
                false,
                BufferWriter::stdout(ColorChoice::Never),
            );
            assert_eq!(res.unwrap(), 1, "{:?}", entry.file_name());
        }
    }

    #[test]
    fn strict_ignore_works() {
        let res = find_secrets(
            &[PathBuf::from("test")],
            &[],
            true,
            false,
            BufferWriter::stdout(ColorChoice::Never),
        );
        assert_eq!(res.unwrap(), 0);

        let res = find_secrets(
            &[
                PathBuf::from("test/one_per_line/aws"),
                PathBuf::from("test/one_per_line/azure"),
            ],
            &[],
            true,
            false,
            BufferWriter::stdout(ColorChoice::Never),
        );
        assert_eq!(res.unwrap(), 0);
    }
}
