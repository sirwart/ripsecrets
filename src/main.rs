// use std::env;
use clap::Parser;
use std::error::Error;
use std::fmt;
use std::path::PathBuf;

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

/// Prevent committing secret keys into your source code
#[derive(Parser, Debug)]
#[clap(version, about, name = "secrets")]
struct Args {
    /// Install `secrets` as a pre-commit hook automatically in your current git repository
    #[clap(long = "install-pre-commit")]
    install_pre_commit: bool,

    /// Source files to check for secrets.
    /// Can be files or directories.
    #[clap(name = "Source files to check", parse(from_os_str), required = true)]
    paths: Vec<PathBuf>,
}

fn main() -> Result<(), Box<dyn Error>> {
    let args = Args::parse();
    if args.install_pre_commit {
        pre_commit::install_pre_commit(".")?;
    } else {
        find_secrets::find_secrets(&args.paths)?;
    }
    Ok(())
}
