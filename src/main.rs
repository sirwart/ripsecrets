#![allow(clippy::needless_return)]

use ripsecrets::find_secrets;
use std::process;
use termcolor::{BufferWriter, ColorChoice};

mod pre_commit;

include!("args.rs");

#[derive(Debug)]
pub enum UsageError {
    PreCommit,
    Version,
    Help,
}

enum RunResult {
    PreCommitInstallSuccessful,
    NoSecretsFound,
    SecretsFound,
    Error(String),
}

fn main() {
    match run() {
        RunResult::PreCommitInstallSuccessful => process::exit(0),
        RunResult::NoSecretsFound => process::exit(0),
        RunResult::SecretsFound => process::exit(1),
        RunResult::Error(e) => {
            eprintln!("Error: {}", e);
            process::exit(2)
        }
    }
}

fn run() -> RunResult {
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
        return RunResult::Error(format!(
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
                    // pre-commit, return an Error as a String
                    return RunResult::Error(err.to_string());
                }
            }
        }
        // Made it through all the paths just fine
        RunResult::PreCommitInstallSuccessful
    } else {
        match find_secrets(
            &paths,
            &args.additional_patterns,
            args.strict_ignore,
            args.only_matching,
            BufferWriter::stdout(ColorChoice::Never),
        ) {
            Ok(0) => RunResult::NoSecretsFound,
            // If we found 1 or more secrets, it's not an error, BUT we do
            // want to notify the user via a different exit code.
            Ok(_num_secrets) => RunResult::SecretsFound,
            // If there's a real error, return it as a String for main()
            // to handle.
            Err(err) => RunResult::Error(err.to_string()),
        }
    }
}
