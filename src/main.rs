use clap::{Args, Parser, Subcommand};
use std::error::Error;
use std::fmt;
use std::path::Path;
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
#[derive(Parser)]
#[clap(
    version,
    about,
    name = "secrets",
    long_about = "secrets searches files and directories recursively for secret API keys.
It's primarily designed to be used as a pre-commit to prevent committing
secrets into version control."
)]
struct Cli {
    #[clap(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Install `secrets` as a pre-commit hook automatically in your current git repository
    #[clap(alias = "install-pre-commit")]
    Precommit {},

    /// Check files or directories for secrets
    #[clap(alias = "check")]
    Check(CheckRequest),
}

#[derive(Args)]
struct CheckRequest {
    /// If you pass a path as an argument that's ignored by .secretsignore it
    /// will be scanned by default. --strict-ignore will override this
    /// behavior and not search the paths passed as arguments that are excluded
    /// by the .secretsignore file. This is useful when invoking secrets as a
    /// pre-commit.
    #[clap(long = "strict-ignore")]
    strict_ignore: bool,

    /// Source files to check for secrets. Can be files or directories.
    #[clap(name = "Source files to check", parse(from_os_str))]
    paths: Vec<PathBuf>,
}

fn main() -> Result<(), Box<dyn Error>> {
    let cli = Cli::parse();
    match &cli.command {
        Commands::Precommit {} => pre_commit::install_pre_commit(Path::new("."))?,
        Commands::Check(check_request) => {
            // I don't love this, but it's the best way I can figure to get it to
            // check "." if given no paths (an empty vec)...
            if check_request.paths.is_empty() {
                match find_secrets::find_secrets(
                    &[PathBuf::from(".")],
                    check_request.strict_ignore,
                )? {
                    0 => process::exit(2),
                    _ => process::exit(1),
                }
            } else {
                match find_secrets::find_secrets(&check_request.paths, check_request.strict_ignore)?
                {
                    0 => process::exit(2),
                    _ => process::exit(1),
                }
            }
        }
    };
    Ok(())
}
