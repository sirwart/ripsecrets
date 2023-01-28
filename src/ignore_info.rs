use std::collections::HashSet;
use std::env;
use std::error::Error;
use std::fs;
use std::io::Write;
use std::option::Option;
use std::path::PathBuf;

use ignore::gitignore::Gitignore;
use tempfile::NamedTempFile;

pub struct IgnoreInfo {
    pub ignore_file_path: Option<PathBuf>,
    pub ignore_matcher: Option<Gitignore>,
    pub ignore_secrets: HashSet<Vec<u8>>,

    _tmp_file: Option<NamedTempFile>,
}

const SECRETS_SECTION_HEADER: &str = "[secrets]\n";

pub fn get_ignore_info() -> Result<IgnoreInfo, Box<dyn Error>> {
    /*
        - check for the existence of .secretsignore
        - if it exists, and is only file ignores, add return it directly
        - if it contains only secrets, only add secret exclusions
        - if it contains both, write file ignores to a temp file and add it
    */

    let mut secrets_ignore_filename = env::current_dir()?;

    secrets_ignore_filename.push(".secretsignore");

    let mut maybe_ignore_file_path: Option<PathBuf> = None;
    let mut maybe_ignore_matcher: Option<Gitignore> = None;
    let mut maybe_tmp_file: Option<NamedTempFile> = None;
    let mut ignore_secrets = HashSet::<Vec<u8>>::new();

    if secrets_ignore_filename.exists() {
        let ignore_contents = fs::read_to_string(&secrets_ignore_filename)?;
        if ignore_contents.contains(SECRETS_SECTION_HEADER) {
            let components = ignore_contents
                .split(SECRETS_SECTION_HEADER)
                .collect::<Vec<&str>>();
            if !components[0].is_empty() {
                let mut tmp_file = NamedTempFile::new()?;
                tmp_file.write_all(components[0].as_bytes())?;
                maybe_ignore_file_path = Some(PathBuf::from(tmp_file.path()));
                maybe_ignore_matcher = Some(Gitignore::new(tmp_file.path()).0);
                maybe_tmp_file = Some(tmp_file);
            }
            for secret in components[1].split('\n') {
                if !secret.is_empty() && !secret.starts_with('#') {
                    // lines start with a # are comments

                    ignore_secrets.insert(Vec::from(secret.as_bytes()));
                }
            }
        } else {
            maybe_ignore_file_path = Some(secrets_ignore_filename);
        }
    }

    return Ok(IgnoreInfo {
        ignore_file_path: maybe_ignore_file_path,
        ignore_matcher: maybe_ignore_matcher,
        ignore_secrets,
        _tmp_file: maybe_tmp_file,
    });
}
