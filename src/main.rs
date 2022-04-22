use clap::Parser;
use std::error::Error;
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

/// Prevent committing secret keys into your source code
#[derive(Parser, Debug)]
#[clap(
    version,
    about,
    name = "secrets",
    long_about = "secrets searches files and directories recursively for secret API keys.
It's primarily designed to be used as a pre-commit to prevent committing
secrets into version control."
)]
struct Args {
    /// Install `secrets` as a pre-commit hook automatically in git directory provided. Defaults to
    /// '.'
    #[clap(long = "install-pre-commit")]
    install_pre_commit: bool,

    /// If you pass a path as an argument that's ignored by .secretsignore it
    /// will be scanned by default. --strict-ignore will override this
    /// behavior and not search the paths passed as arguments that are excluded
    /// by the .secretsignore file. This is useful when invoking secrets as a
    /// pre-commit.
    #[clap(long = "strict-ignore")]
    strict_ignore: bool,

    /// Source files. Can be files or directories. Defaults to '.'
    #[clap(name = "Source files", parse(from_os_str))]
    paths: Vec<PathBuf>,
}

fn main() -> Result<(), Box<dyn Error>> {
    let args = Args::parse();
    let paths = if args.paths.is_empty() {
        vec![PathBuf::from(".")]
    } else {
        args.paths
    };

    if args.install_pre_commit {
        for path in paths {
            pre_commit::install_pre_commit(&path)?;
        }
    } else {
        match find_secrets::find_secrets(&paths, args.strict_ignore)? {
            0 => process::exit(0),
            _ => process::exit(1),
        };
    }
    Ok(())
}
