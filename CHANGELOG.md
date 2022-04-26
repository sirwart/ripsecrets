## 0.1.4 (Not yet released)

- [Bug #31] Detect secrets assigned with := operator

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
