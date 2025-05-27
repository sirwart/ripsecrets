## 0.1.10 (2025-05-26)

- Increased max random string length to catch terraform secrets
- More characters are now allowed in random strings
- Support for detecting maven secrets

## 0.1.9 (2025-03-23)

- Add intra42 and Square secret matcher
- Add shell completions support
- Fewer false negatives for AWS secrets
- More intuitive precedence for .secretsignore file

## 0.1.8 (2024-04-20)

- Publish to crates.io

## 0.1.7 (2023-09-11)

- Add detection for secrets in database connection strings and other URLs
- Fewer false positives for non-random strings assigned to a secret
- Support additional secret regex patterns using the --additional-pattern
  argument

## 0.1.6 (2023-08-22)

- Fix handling of .secretsignore files without [secrets] section (#61)
- Add detection for gitlab tokens (Fixes #62)
- Better detection of hex secrets

## 0.1.5 (2022-06-26)

- Fix excessive false positives from random string detection

## 0.1.4 (2022-05-14)

- [Bug #31] Detect secrets assigned with := operator
- Fix pre-commit getting installed at wrong filename
- Added more patterns to search for secret assignments
- Added --only-matching option

## 0.1.3 (2022-04-22)

- Renamed from `secrets` to `ripsecrets` to avoid name collisions with other
  projects.
- Added a new --strict-ignore option for pre-commit usage. When a pre-commit is
  invoked it includes a list of filenames. By default secrets will search
  referenced files regardless of the contents of .gitignore or .secretsignore.
  However in a pre-commit context this will cause files explicitly ignored by
  .secretsignore to be searched and the pre-commit to potentially fail. Using
  the --strict-ignore flag will cause the .secretsignore file to be respected
  even if the file is passed as an argument.
- More targeted JWT regex
- Lower minimum token length for random string detection
- Don't explicitly flag AWS access key IDs since they're not secrets
- Fix bug with legacy npm token regex
- [Bug #13] More targeted random string regex

## 0.1.2 (2022-04-17)

- More targeted AWS regex
- Add --help and --version subcommands

## 0.1.1 (2022-04-16)

- Fix crash when running with no arguments
- Notarize binaries for macOS properly

## 0.1 (2022-04-15)

Initial release
