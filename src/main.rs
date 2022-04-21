use std::env;
use std::error::Error;
use std::ffi::OsString;
use std::fmt;
use std::path::PathBuf;
use std::process;

mod find_secrets;
mod ignore_info;
mod matcher;
mod p_random;
mod pre_commit;

#[derive(Debug)]
pub enum UsageError {
    PreCommit,
    Version,
    Help,
}

impl std::error::Error for UsageError {}

impl fmt::Display for UsageError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            UsageError::PreCommit => write!(f, "Usage: secrets --install-pre-commit"),
            UsageError::Version => write!(f, "Usage: secrets --version"),
            UsageError::Help => write!(f, "Usage: secrets --help"),
        }
    }
}

fn main_aux(args: &Vec<OsString>) -> Result<usize, Box<dyn Error>> {
    let mut match_count: usize = 0;

    if args.len() > 1 && args[1] == "--install-pre-commit" {
        if args.len() > 2 {
            return Err(Box::new(UsageError::PreCommit));
        }
        pre_commit::install_pre_commit(&PathBuf::from("."))?;
    } else if args.len() > 1 && args[1] == "--version" {
        if args.len() > 2 {
            return Err(Box::new(UsageError::Version));
        }
        println!("secrets {}", env!("CARGO_PKG_VERSION"));
    } else if args.len() > 1 && args[1] == "--help" {
        if args.len() > 2 {
            return Err(Box::new(UsageError::Help));
        }
        println!("secrets {}

secrets searches files and directories recursively for secret API keys.
It's primarily designed to be used as a pre-commit to prevent committing
secrets into version control.

USAGE:
    secrets [--strict-ignore] [PATH ...]
    secrets --install-pre-commit
    secrets --help
    secrets --version

OPTIONS:
    --install-pre-commit
        Installs secrets as part of your git pre-commit hook, creating one if
        one doesn't already exist.

    --strict-ignore
        If you pass a path as an argument that's ignored by .secretsignore it
        will be scanned by default. --strict-ignore will override this
        behavior and not search the paths passed as arguments that are excluded
        by the .secretsignore file. This is useful when invoking secrets as a
        pre-commit.", env!("CARGO_PKG_VERSION"))
    } else {
        let mut strict_ignore = false;
        let mut paths = Vec::new();
        if args.len() > 1 {
            let mut start_idx = 1;
            if args[1] == "--strict-ignore" {
                strict_ignore = true;
                start_idx = 2;
            }
            for path in &args[start_idx..] {
                paths.push(PathBuf::from(path));
            }
        }
        if paths.len() == 0 {
            paths.push(PathBuf::from("."));
        }
        match_count = find_secrets::find_secrets(&paths, strict_ignore)?;
    }

    return Ok(match_count);
}

fn main() {
    let args: Vec<OsString> = env::args_os().collect();

    match main_aux(&args) {
        Err(err) => {
            eprintln!("{}", err);
            process::exit(2);
        }
        Ok(match_count) => {
            if match_count > 0 {
                process::exit(1);
            }
        }
    }
}
