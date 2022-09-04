# ripsecrets

![ripsecrets logo, a gravestone that says "R.I.P. Secrets ?-20XX Death by Exposure"](.github/ripsecrets-logo.svg)

`ripsecrets` is a command-line tool to prevent committing secret keys into your source code. `ripsecrets` has a few features that distinguish it from other secret scanning tools:

## What makes ripsecrets different

`ripsecrets` has a few features that distinguish it from other secret scanning tools:

1. **Focused on pre-commit**. It's a lot cheaper to prevent secrets from getting committed in the first place than dealing with the consequences once a secret that has been committed to your repository has been detected.

2. **Extremely fast**. Using a secret scanner shouldn't slow down your development workflow, so `ripsecrets` is 95 times faster or more than other tools. [Learn more about how it's designed for performance](#performance).

3. **Always local operation**. Many other secret scanners try to verify that the secrets are valid, which is practice means sending strings from your source code to 3rd party services automatically. There's a security versus convenience tradeoff in that decision, but `ripsecrets` is designed to be the best "local only" tool and will never send data off of your computer.

4. **Low rate of false positives**. While local-only tools are always going to have more false positives than one that verifies secrets, `ripsecrets` uses a probability theory based approach in order to detect keys more accurately than other tools.

5. **Single binary with no dependencies**. Installing `ripsecrets` is as easy as copying the binary into your `bin` directory.

## Usage

By default, running `ripsecrets` will recursively search source files in your current directory for secrets.

```
$ ripsecrets
```

For every secret it finds it will print out the file, line number, and the secret that was found. If it finds any secrets it will exit with a non-zero status code.

You can optionally pass a list of files and directories to search as arguments.

```
$ ripsecrets file1 file2 dir1
```

This is most commonly used to search files that are about to be committed to source control for accidentally included secrets. 

### Installing ripsecrets as a pre-commit hook 

You can install `ripsecrets` as a pre-commit hook _automatically_ in your current git repository using the following command:

```
$ ripsecrets --install-pre-commit
```

If you would like to install `ripsecrets` _manually_, you can add the following command to your `pre-commit` script:

```
ripsecrets --strict-ignore `git diff --cached --name-only --diff-filter=ACM`
```

Passing `--strict-ignore` ensures that your `.secretsignore` file is respected when running secrets as a pre-commit.

## Installation

### Homebrew

[`ripsecrets`](https://formulae.brew.sh/formula/ripsecrets) is available in Homebrew for macOS and Linux:

```
$ brew install ripsecrets
```

### Pre-built

You can download a prebuilt binary for the latest release from the [releases](https://github.com/sirwart/secrets/releases) page.

### Cargo

Alternatively, if you have [Rust](https://www.rust-lang.org/tools/install) and Cargo installed, you can run:

```
$ cargo install --git https://github.com/sirwart/ripsecrets --branch main
```

### Nix Flake

Assuming you have enabled [Flakes](https://nixos.wiki/wiki/Flakes) in your Nix configuration, you can build the `ripsecrets` binary and make it available in your default Nix profile by running:
```
$ nix profile install github:sirwart/ripsecrets
```

### Using `pre-commit`

`ripsecrets` can work as a plugin for [pre-commit](https://pre-commit.com/) with
the following configuration.

Note that this may require having Cargo and a Rust compiler already installed.
See the [pre-commit rust plugin docs](https://pre-commit.com/#rust) for more
information.

```yaml
repos:
-   repo: https://github.com/sirwart/ripsecrets.git
    # Set your version, be sure to use the latest and update regularly or use 'main'
    rev: v0.1.3
    hooks:
    -   id: ripsecrets
```

## Ignoring secrets

`ripsecrets` will respect your .gitignore files by default, but there might still be files you want to exclude from being scanned for secrets. To do that you can create a .secretsignore file, which supports similar syntax to a .gitignore file for ignoring files. In addition to excluding files, it also supports a `[secrets]` section that allows ignoring individual secrets.

```
test/*
dummy

[secrets]
pAznMW3DsrnVJ5TDWwBVCA
```

In addition to the .secretsignore file, `ripsecrets` is compatible with `detect-secrets` style allowlist comments on the same line as the detected secret:

```
test_secret = "pAznMW3DsrnVJ5TDWwBVCA" # pragma: allowlist secret
```

## How it works

 `ripsecrets` has 2 types of secrets that it can find in code:

1. Secrets with known patterns that can be matched. API keys from services like Stripe and Slack have a predefined prefix that identifies them as API keys and can be found via regular expressions very reliably. You can see the current list of known secrets matched by `ripsecrets` [here](https://github.com/sirwart/ripsecrets/blob/main/src/find_secrets.rs#L17).

2. Random strings assigned to secret variables. Some secrets, like AWS's secret access keys, don't have a known pattern that can be unambiguously matched. To detect these, `ripsecrets` looks for variables or properties that are being assigned with words like "token", "secret", and "password", and checks if a random string is assigned to it.

To determine if a string is random or not `ripsecrets` looks at a few properties of a string, like how many distinct characters it has, and calculates how likely it is to have occurred by random chance. If the probability that it happened by chance is less than 1 in 10,000 then it's determined to not be a secret. You can learn more about how the probability is calculated [here](https://github.com/sirwart/ripsecrets/blob/main/src/p_random.rs#L7).

If you find either a false negative (a secret that wasn't found by `ripsecrets`) or a false positive (a non-secret that was flagged as such), please open an issue or a pull request.

## Performance

The slowest part of secret scanning is looking for potential secrets in a large number of files. To do this quickly `ripsecrets` does a couple of things:

1. All the secret patterns are compiled into a single regex, so each file only needs to be processed once.

2. This regex is fed to [ripgrep](https://github.com/BurntSushi/ripgrep), which is specially optimized to running a regex against a large number of files quickly.

Additionally, `ripsecrets` is written in Rust, which means there's no interpreter startup time. To compare real world performance, here's the runtime of a few different scanning tools to search for secrets in the [Sentry repo](https://github.com/getsentry/sentry) on an M1 air laptop:

| tool           | avg. runtime | vs. baseline |
| -------------- | ------------ | ------------ |
| ripsecrets     | 0.32s        | 1x           |
| trufflehog     | 31.2s        | 95x          |
| detect-secrets | 73.5s        | 226x         |

Most of the time, your pre-commit will be running on a small number of files, so the runtimes above are not typical, but when working with large commits that touch a lot of files the runtime can become noticeable.

## Running benchmarks

```shell
$ cargo bench
```

The results will then be viewable at `target/criterion/report/index.html`.

## Alternative tools

Even if `ripsecrets` is not the right tool for you, if you're working on a service that deals with user data you should strongly consider using a secret scanner. Here are some alternative tools worth considering:

- [detect-secrets](https://github.com/Yelp/detect-secrets)
- [trufflehog](https://github.com/trufflesecurity/trufflehog)
- [gitleaks](https://github.com/zricethezav/gitleaks)
