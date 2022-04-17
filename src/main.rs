use std::env;
use std::error::Error;
use std::fmt;
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

fn main_aux(args: &Vec<String>) -> Result<usize, Box<dyn Error>> {
    let mut match_count: usize = 0;
    let mut path = ".";

    if args.len() > 1 && args[1] == "--install-pre-commit" {
        if args.len() > 2 {
            return Err(Box::new(UsageError::PreCommit));
        }
        pre_commit::install_pre_commit(path)?;
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
    secrets [PATH ...]
    secrets --install-pre-commit
    secrets --help
    secrets --version", env!("CARGO_PKG_VERSION"))
    } else {
        let mut additional_paths: &[String] = &[];
        if args.len() > 1 {
            path = &args[1];
            if args.len() > 2 {
                additional_paths = &args[2..];
            }
        }
        match_count = find_secrets::find_secrets(path, &additional_paths)?;
    }

    return Ok(match_count);
}

fn main() {
    let args: Vec<String> = env::args().collect();

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
