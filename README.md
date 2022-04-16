# secrets

`secrets` is a command-line tool to prevent committing secret keys into your source code. `secrets` has a few features that distinguish it from other secret scanning tools:

1. Focused on pre-commit. It's a lot cheaper to prevent secrets from getting committed in the first place than dealing with the consequences once a secret that has been committed to your repository has been detected.

2. Extremely fast. Using a secret scanner shouldn't slow down your development workflow, so `secrets` is 95 times faster or more than other tools. Learn more about how it's designed for performance [here](#performance).

3. Always local operation. Many other secret scanners try to verify that the secrets are valid, which is practice means sending strings from your source code to 3rd party services automatically. There's a security versus convienience tradeoff in that decision, but `secrets` is designed to be the best "local only" tool and will never send data off of your computer.

4. Low rate of false positives. While local-only tools are always going to have more false positives than one that verifies secrets, `secrets` uses a probability theory based approach in order to more accurately detect keys than other tools.

5. Single binary with no dependencies. Installing `secrets` is as easy as copying the binary into your `bin` directory.

## Usage

By default running `secrets` will recursively search source files in your current directory for secrets. For every secret it finds it will print out the file, line number, and the secret that was found. If it finds any secrets it will exit with a non-zero status code.

You can optionally pass a list of files and directories to search as arguments. This most commonly used to search files that are about to be committed to source control for accidentically included secrets. For example, to use `secrets` as a git pre-commit hook you can add the following command to your `pre-commit` script:

```
secrets `git diff --cached --name-only --diff-filter=ACM`
```

This command will fail if `secrets` detects any secrets in the files modified by the commit. You can install `secrets` as a pre-commit hook automatically in your current git repository using the following command:

```
secrets --install-pre-commit
```

## Ignoring secrets

`secrets` will respect your .gitignore files by default, but there might still be files you want to exclude from being scanned for secrets. To do that you can create a .secretsignore file, which supports similar syntax to a .gitignore file for ignoring files. In addition to excluding files, it also it also supports a `[secrets]` section that allows ignoring individual secrets.

```
test/*
dummy

[secrets]
pAznMW3DsrnVJ5TDWwBVCA
```

In addition to the .secretsignore file, `secrets` is compatible with `detect-secrets` style allowlist comments on the same line as the detected secret:

```
test_secret = "pAznMW3DsrnVJ5TDWwBVCA" # pragma: allowlist secret
```

## Performance

There were a few core decisions made in the design of `secrets` to optimize performance:

1. Written in a compiled language. Interpreted programs have longer startup time than compiled ones, which becomes a high percentage of total runtime for commands that only run for a fraction of a second.

2. Uses the fastest regex engine. The biggest bottleneck for secret scanning is looking for secret-like strings using a regex in a large number of files. This is a job that the excellent [ripgrep](https://github.com/BurntSushi/ripgrep) is specifically optimized to be the best at, so `secrets` was designed around using the `ripgrep` engine for parallel file walking and regex searching, down to being written in rust.

3. A single pass on files. Other scanners use N different regexes for N different secret patterns that need to be checked, which means you have to run N passes on every file you're checking. This is very flexible and modular, but comes at a large cost to performance. `secrets` compiles all patterns as a single regex to get the most performance out of the underlying regex engine.

To compare real world performance, here's the runtime of a few different scanning tools to search for secrets in the [Sentry repo](https://github.com/getsentry/sentry) on an M1 air laptop:

| tool           | avg. runtime | vs. baseline |
| -------------- | ------------ | ------------ |
| secrets        | 0.32s        | 1x           |
| trufflehog     | 31.2s        | 95x          |
| detect-secrets | 73.5s        | 226x         |

Most of the time your pre-commit will be running on a small number of files, so that runtime is not typical, but when working with large commits that touch a lot of files the runtime becomes very noticeable.

## Alternative tools

Even if `secrets` is not the right tool for you, if you're working on a service that deals with user data you should strongly consider using a secret scanner. Here are some alterative tools worth considering:

## [detect-secrets](https://github.com/Yelp/detect-secrets)

`detect-secrets` was the inspiration for `secrets`. `secrets` was originally conceived as a much faster, more focused version of `detect-secrets` with better random string detection. However, `detect-secrets` still has a lot more features that might be a better fit for your use case.

## [trufflehog](https://github.com/trufflesecurity/trufflehog)

`trufflehog` recently released a version 3, which was a complete re-write from the previous versions and promises better performance and no external dependencies. It's very focused on secret verification, which means fewer false positives but also sending secrets from your source code to external services. It also offers a range of secret scanning services whereas `secrets` is primarily focused on being a good pre-commit hook.
