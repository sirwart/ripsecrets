use std::error::Error;
use std::fmt;
use std::fs;
use std::fs::OpenOptions;
use std::io::Write;
use std::os::unix::fs::PermissionsExt;
use std::path::Path;

#[derive(Debug)]
pub enum PreCommitError {
    GitDirectoryNotFound,
    HookAlreadyInstalled,
}

impl std::error::Error for PreCommitError {}

impl fmt::Display for PreCommitError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            PreCommitError::GitDirectoryNotFound => write!(f, ".git directory not found"),
            PreCommitError::HookAlreadyInstalled => {
                write!(f, "pre-commit hook has already been installed")
            }
        }
    }
}

const PRE_COMMIT: &[u8] =
    b"ripsecrets --strict-ignore `git diff --cached --name-only --diff-filter=ACM`\n";

pub fn install_pre_commit(repo_root: &Path) -> Result<(), Box<dyn Error>> {
    let git_root = Path::new(repo_root).join(".git");
    if !git_root.exists() {
        return Err(Box::new(PreCommitError::GitDirectoryNotFound));
    }

    let hooks_dir = git_root.join("hooks");

    let pre_commit_dir = git_root.join("pre-commit.d");
    if pre_commit_dir.exists() {
        let pre_commit_dir_fname = pre_commit_dir.join("ripsecrets");
        if pre_commit_dir_fname.exists() {
            return Err(Box::new(PreCommitError::HookAlreadyInstalled));
        }
        write_pre_commit_file(&pre_commit_dir_fname)?;
    } else {
        let pre_commit_fname = hooks_dir.join("pre-commit");

        if !pre_commit_fname.exists() {
            write_pre_commit_file(&pre_commit_fname)?;
        } else {
            let existing = fs::read(&pre_commit_fname)?;
            match existing
                .windows(PRE_COMMIT.len())
                .position(|window| window == PRE_COMMIT)
            {
                None => {
                    let mut file = OpenOptions::new()
                        .write(true)
                        .append(true)
                        .open(pre_commit_fname)
                        .unwrap();

                    file.write_all(PRE_COMMIT)?;
                }
                Some(_) => {
                    return Err(Box::new(PreCommitError::HookAlreadyInstalled));
                }
            }
        }
    }

    return Ok(());
}

fn write_pre_commit_file(path: &Path) -> Result<(), Box<dyn Error>> {
    fs::write(path, PRE_COMMIT)?;
    let mut perms = fs::metadata(path)?.permissions();
    perms.set_mode(perms.mode() | 0o100);
    fs::set_permissions(path, perms)?;

    return Ok(());
}
