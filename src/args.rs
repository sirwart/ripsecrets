use clap::Parser;
use std::path::PathBuf;

/// Prevent committing secret keys into your source code.
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
    /// Install `ripsecrets` as a pre-commit hook automatically in git directory provided.
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

    /// Additional regex patterns used to find secrets. If there is a matching
    /// group in the regex the matched group will be tested for randomness before
    /// being reported as a secret.
    #[clap(long = "additional-pattern")]
    additional_patterns: Vec<String>,

    /// Source files. Can be files or directories. Defaults to '.'
    #[clap(name = "Source files")]
    paths: Vec<PathBuf>,
}
