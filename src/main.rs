use clap::Parser;
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

/// Prevent committing secret keys into your source code
#[derive(Parser, Debug)]
#[clap(
    version,
    about,
    name = "ripsecrets",
    long_about = "ripsecrets searches files and directories recursively for secret API keys.
It's primarily designed to be used as a pre-commit to prevent committing
secrets into version control."
)]
struct Args {
    /// Install `ripsecrets` as a pre-commit hook automatically in git directory provided. Defaults to
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

    /// Print only the matched (non-empty) parts of a matching line, with each such
    /// part on a separate output line.
    #[clap(long = "only-matching")]
    only_matching: bool,

    /// Source files. Can be files or directories. Defaults to '.'
    #[clap(name = "Source files", parse(from_os_str))]
    paths: Vec<PathBuf>,
}

fn main() -> Result<(), String> {
    let args = Args::parse();
    let paths = if args.paths.is_empty() {
        vec![PathBuf::from(".")]
    } else {
        args.paths
    };

    if args.install_pre_commit && (args.strict_ignore || args.only_matching) {
        let option = if args.strict_ignore {
            "--strict-ignore"
        } else {
            "--only-matching"
        };
        return Err(format!(
            "{} is not a valid option when installing pre-commits. Use --install-pre-commit alone",
            option
        ));
    }

    if args.install_pre_commit {
        for path in paths {
            match pre_commit::install_pre_commit(&path) {
                // If we installed pre-commit to this path
                // just fine, keep iterating
                Ok(()) => (),
                Err(err) => {
                    // If we get an error when trying to install
                    // pre-commit, exit with Error as a String
                    return Err(err.to_string());
                }
            }
        }
        // Made it through all the paths just fine
        // Exit Ok
        Ok(())
    } else {
        match find_secrets::find_secrets(&paths, args.strict_ignore, args.only_matching) {
            // We already printed info on discovered secrets,
            // so just exit
            Ok(_num_secrets) => Ok(()),
            Err(err) => Err(err.to_string()),
        }
    }
}
