window.BENCHMARK_DATA = {
  "lastUpdate": 1742748843582,
  "repoUrl": "https://github.com/sirwart/ripsecrets",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "joseph@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "30a3c80f4ecde56780e6e50216332601979d3775",
          "message": "Add pre-commit checks (#45)\n\n* Configure pre-commit hooks as part of Nix shell\r\n\r\nThe pre-commit hooks added are\r\n- nixfmt\r\n- rustfmt\r\n- cargo check\r\n- clippy\r\n\r\n* Autoformat Nix files using `nixfmt`\r\n\r\n* Run pre-commit via Nix as part of CI workflow\r\n\r\n* Gitignore `/result`\r\n\r\n* Autoformat Rust source files using `rustfmt`\r\n\r\n* Skip build as part of `nix flake check`",
          "timestamp": "2022-11-28T20:33:50-08:00",
          "tree_id": "1103fbb86d276a351bc527246f94194ebae2db2d",
          "url": "https://github.com/sirwart/ripsecrets/commit/30a3c80f4ecde56780e6e50216332601979d3775"
        },
        "date": 1669696878192,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7619276198,
            "range": "± 846531573",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "joseph@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f5d8a515a846024f153884763f0a92b7543fce0c",
          "message": "Build Docker image and publish to Hub on tag (#46)\n\nThis adds a GitHub Actions workflow for building and uploading a Docker image to Docker hub. The workflow is triggered when a new tag is added or it can be run manually. The prerequisites are\r\n\r\n- a Docker Hub account with the same username as GitHub;\r\n- a Docker Hub repository with the same name as the repository (in this case \"ripsecrets\", though forks can rename); and\r\n- the Docker Hub username and a write token saved in GitHub Secrets as DOCKERHUB_USERNAME and DOCKERHUB_TOKEN, respectively.\r\n\r\nSee https://hub.docker.com/r/lafrenierejm/ripsecrets/tags for an example of an image built from the corresponding workflow on my fork.\r\n\r\nThe main limitation of this current approach is that the image that's built and uploaded is not multi-arch. The workflow is currently configured to run only on x86_64 Linux, so as of now that is the only architecture supported by the resulting image.",
          "timestamp": "2022-12-02T20:18:35-08:00",
          "tree_id": "34045d621684b03e495517334e9b46d98be811ec",
          "url": "https://github.com/sirwart/ripsecrets/commit/f5d8a515a846024f153884763f0a92b7543fce0c"
        },
        "date": 1670041638800,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 8661075971,
            "range": "± 1072301801",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "joseph@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fc9e7af72e20fa3856a609b4712e2342fcacfae4",
          "message": "Remove getsentry/sentry submodule (#49)\n\n* Remove github.com:getsentry/sentry submodule\r\n\r\nThis is needed to avoid the sentry repo being downloaded when installing\r\nripsecrets via Cargo.\r\n\r\n* Shallow clone getsentry/sentry when running benchmark",
          "timestamp": "2022-12-03T08:38:27-08:00",
          "tree_id": "34d939a8f519a4d90c59eb1b11ad0f117504351a",
          "url": "https://github.com/sirwart/ripsecrets/commit/fc9e7af72e20fa3856a609b4712e2342fcacfae4"
        },
        "date": 1670085948603,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7094238171,
            "range": "± 574124566",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "colindean@users.noreply.github.com",
            "name": "Colin Dean",
            "username": "colindean"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f730be1601b4ea9da14988a59014f90146ce90be",
          "message": "Bumps pre-commit example to 0.1.5 (#50)",
          "timestamp": "2022-12-10T17:41:04-08:00",
          "tree_id": "3d337067219b95b5c4e3a3c8e21e9418bd47fe9c",
          "url": "https://github.com/sirwart/ripsecrets/commit/f730be1601b4ea9da14988a59014f90146ce90be"
        },
        "date": 1670723414393,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 8782648781,
            "range": "± 563683512",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "colindean@users.noreply.github.com",
            "name": "Colin Dean",
            "username": "colindean"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a0d3a739b20d54170762e531c34518d94bf8329c",
          "message": "Provide hook option to use a locally-installed ripsecrets (#51)\n\n* Provide hook option to use a locally-installed ripsecrets\r\n\r\nThis should enable a pre-commit config to use a ripsecrets binary already installed instead of having to build ripsecrets from source. Notably, this should allow Homebrew users to include precommit and ripsecrets in a Brewfile and avoid having to also have a rust build environment installed just for ripsecrets usage with precommit.\r\n\r\n* Explains hooks differences in README",
          "timestamp": "2022-12-10T17:42:19-08:00",
          "tree_id": "aa799fe30167080b80cb29956f59fb6c5778b1e9",
          "url": "https://github.com/sirwart/ripsecrets/commit/a0d3a739b20d54170762e531c34518d94bf8329c"
        },
        "date": 1670723450358,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7065282904,
            "range": "± 899058192",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "joseph@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "42acb0648ceadfa92d99bfcb68a9b8f911226312",
          "message": "Cache Cargo dependencies during Nix build (#52)\n\n* Replace `naersk` with `crane` to cache Nix-built dependencies\r\n\r\n* Remove `cargo check` pre-commit hook\r\n\r\nhttps://github.com/cachix/pre-commit-hooks.nix/issues/126 reduces the usefulness\r\nof the hook.  I would like to reintroduce this check once that upstream issue\r\nhas been resolved.\r\n\r\n* Update Nix flake sources\r\n\r\n* Update Cargo dependencies\r\n\r\n```shell\r\ncargo update\r\n```\r\n\r\n* Replacing single-character string with char\r\n\r\n* Add `packages.ripsecrets`\r\n\r\n* Perform Nix flake build and check in same step",
          "timestamp": "2022-12-22T21:46:50-08:00",
          "tree_id": "1cb6a26d116ad735ef3aa34e79172ffa8fb87675",
          "url": "https://github.com/sirwart/ripsecrets/commit/42acb0648ceadfa92d99bfcb68a9b8f911226312"
        },
        "date": 1671774809487,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 5551152618,
            "range": "± 92525877",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "joseph@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e0db1b2383b3407b30227c41b0cdad2948418e2e",
          "message": "Enable `typos` pre-commit hook and correct detected typos (#56)\n\n* Enable `clippy` as a Nix flake checker\r\n\r\n* Apply changes suggested by Clippy\r\n\r\n* Enable `typos` pre-commit hook and correct detected typos\r\n\r\nSee https://github.com/crate-ci/typos for more information.",
          "timestamp": "2023-01-28T11:35:41-08:00",
          "tree_id": "4c8110d0daa6b9ed0db72032c79ec27fc4dc5924",
          "url": "https://github.com/sirwart/ripsecrets/commit/e0db1b2383b3407b30227c41b0cdad2948418e2e"
        },
        "date": 1674934935857,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 8247061672,
            "range": "± 116289404",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@adamj.eu",
            "name": "Adam Johnson",
            "username": "adamchainz"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7b33cbeb529e6157988feb0842ad8abdf00dd379",
          "message": "Fix some links in README (#59)",
          "timestamp": "2023-02-01T15:32:09-08:00",
          "tree_id": "f9dc84691fd66837538318f5fe5375daa7dc9b3c",
          "url": "https://github.com/sirwart/ripsecrets/commit/7b33cbeb529e6157988feb0842ad8abdf00dd379"
        },
        "date": 1675294720807,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 8034800178,
            "range": "± 197457494",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@adamj.eu",
            "name": "Adam Johnson",
            "username": "adamchainz"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c78e9b14a99823c3a660debe1d3464e8c16f5561",
          "message": "Improve pre-commit framework docs (#58)",
          "timestamp": "2023-02-01T15:34:52-08:00",
          "tree_id": "ffb31999ed0af590e1874ad48fea32ea0e2dd551",
          "url": "https://github.com/sirwart/ripsecrets/commit/c78e9b14a99823c3a660debe1d3464e8c16f5561"
        },
        "date": 1675294972706,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 10107360077,
            "range": "± 396747068",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@adamj.eu",
            "name": "Adam Johnson",
            "username": "adamchainz"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cce91ae1f38d18381e823eac61fd6bd749853519",
          "message": "Fix handling of .secretsignore files without [secrets] (#61)\n\nFixes #60.",
          "timestamp": "2023-02-03T07:31:42-08:00",
          "tree_id": "37109a846a39d27630c1638158a731249a1ace23",
          "url": "https://github.com/sirwart/ripsecrets/commit/cce91ae1f38d18381e823eac61fd6bd749853519"
        },
        "date": 1675438703834,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7857193742,
            "range": "± 206213557",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "cba144e474490358e8b2e3134d16e00abd10e0e4",
          "message": "Add detection for gitlab tokens (Fixes #62)",
          "timestamp": "2023-03-11T15:15:47-08:00",
          "tree_id": "71ddc7447d5995e0b360e6a19e8ae6e37ac15518",
          "url": "https://github.com/sirwart/ripsecrets/commit/cba144e474490358e8b2e3134d16e00abd10e0e4"
        },
        "date": 1678577000189,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 8434982395,
            "range": "± 554805898",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "joseph@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b1283ffaa8400e2da0a06994067de6d979a1f0eb",
          "message": "Add `editorconfig-check` pre-commit hook (#57)\n\nSee https://github.com/editorconfig-checker/editorconfig-checker for more information.\r\n\r\nDepends on #56.",
          "timestamp": "2023-04-24T06:56:59-07:00",
          "tree_id": "226326f3fa633839ccda4f851d6385df384b26e7",
          "url": "https://github.com/sirwart/ripsecrets/commit/b1283ffaa8400e2da0a06994067de6d979a1f0eb"
        },
        "date": 1682345005421,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7182943266,
            "range": "± 314078934",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "joseph@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "712d4fc26711cb6f365ec529325d7e99b0f59226",
          "message": "Export Nix overlay (#64)\n\nAn overlay is required to access this repository's packages from another flake.",
          "timestamp": "2023-04-24T06:58:40-07:00",
          "tree_id": "89335c8e35667aa907fc60e1b8f44b70379daa36",
          "url": "https://github.com/sirwart/ripsecrets/commit/712d4fc26711cb6f365ec529325d7e99b0f59226"
        },
        "date": 1682345124490,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7095184368,
            "range": "± 167096154",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "sschlinkert@gmail.com",
            "name": "Sam Schlinkert",
            "username": "sts10"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ac370a9783efc488358242b6f78e8e10912e5361",
          "message": "upgrades clap dependency (#65)\n\nClap recently got into v4.X.X, so I figured it'd be nice to get ripsecrets using the current up-to-date version, v4.2.5. Required only a minor tweak to reach functional parity with 3.X.X. Should work exactly the same after this PR.",
          "timestamp": "2023-05-01T16:33:31-07:00",
          "tree_id": "543fc59c155fd6a53e8050ba1d649d969a962939",
          "url": "https://github.com/sirwart/ripsecrets/commit/ac370a9783efc488358242b6f78e8e10912e5361"
        },
        "date": 1682984574002,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 11440769273,
            "range": "± 539894505",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "a796ea541383f275f442fc4d0e2cf86e64a8a84b",
          "message": "Better detection of hex secrets\n\nWhen determining whether a string is random or not, it previously\nalways assumed that the string was picked from a vocabulary of 64\ncharacters, which made hex secrets look non-random even if they\nare. This adjusts the randomness calculation to use an appropriate\nvocab size for hex strings.",
          "timestamp": "2023-08-22T17:16:13-07:00",
          "tree_id": "20f6eebdb02b0c0199d4e940e4d92b121272a002",
          "url": "https://github.com/sirwart/ripsecrets/commit/a796ea541383f275f442fc4d0e2cf86e64a8a84b"
        },
        "date": 1692750450560,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7303028695,
            "range": "± 669701077",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "419d4f54c819fba8c1724167a3e4a59a06abb9b0",
          "message": "Version 0.1.6",
          "timestamp": "2023-08-22T18:19:08-07:00",
          "tree_id": "170c1171b4e3a5735e00f9e376b4329b9fa20d2d",
          "url": "https://github.com/sirwart/ripsecrets/commit/419d4f54c819fba8c1724167a3e4a59a06abb9b0"
        },
        "date": 1692753944712,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 7520850954,
            "range": "± 701739646",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "ac2aeb05a067877c675191b6c3760e8b0df783de",
          "message": "Add detection for secrets in database connection strings and other URLs",
          "timestamp": "2023-09-10T18:59:32-07:00",
          "tree_id": "d10c69f2edbeabb385c032e96aa7d7a7d2c65289",
          "url": "https://github.com/sirwart/ripsecrets/commit/ac2aeb05a067877c675191b6c3760e8b0df783de"
        },
        "date": 1694397986342,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 698757443,
            "range": "± 4392101",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "acf74b4480fdc28a5933da01426bca4722e0421b",
          "message": "Fewer false positives for non-random strings assigned to a secret",
          "timestamp": "2023-09-11T09:19:42-07:00",
          "tree_id": "3d6bcd3cb3f29689021818d9b9ed6f50f728d65b",
          "url": "https://github.com/sirwart/ripsecrets/commit/acf74b4480fdc28a5933da01426bca4722e0421b"
        },
        "date": 1694449569169,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 712993930,
            "range": "± 8400661",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lafreniere.xyz",
            "name": "Joseph M LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8a7627cfc4412203d059ee43df320696f10d1daf",
          "message": "Update deps (#80)\n\nBumps rustc to 1.73.0 (cc66ad468 2023-10-03)",
          "timestamp": "2023-12-11T10:33:45-08:00",
          "tree_id": "4276ce150286614fb6c20fa5e3f269f2487b883d",
          "url": "https://github.com/sirwart/ripsecrets/commit/8a7627cfc4412203d059ee43df320696f10d1daf"
        },
        "date": 1702319895265,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 431411248,
            "range": "± 1297125",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lafreniere.xyz",
            "name": "Joseph LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6b3d1aad368b49e2c5d660f5daff4c9a2650121a",
          "message": "Add Cargo metadata (#82)\n\n* Add Cargo `license` metadata\r\n\r\nSee documentation at <https://doc.rust-lang.org/cargo/reference/manifest.html#the-license-and-license-file-fields>.\r\n\r\n* Add Cargo `keywords` metadata\r\n\r\nSee documentation at <https://doc.rust-lang.org/cargo/reference/manifest.html#the-keywords-field>.\r\n\r\n* Add Cargo `categories` metadata\r\n\r\nSee documentation at <https://doc.rust-lang.org/cargo/reference/manifest.html#the-categories-field>.\r\n\r\n* Add Cargo `readme` metadata\r\n\r\nSee documentation at <https://doc.rust-lang.org/cargo/reference/manifest.html#the-readme-field>.",
          "timestamp": "2023-12-24T07:32:14-10:00",
          "tree_id": "613a54309ea275677fb37f5daa0d8a5101a4e388",
          "url": "https://github.com/sirwart/ripsecrets/commit/6b3d1aad368b49e2c5d660f5daff4c9a2650121a"
        },
        "date": 1703439408273,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 440290054,
            "range": "± 2607856",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lafreniere.xyz",
            "name": "Joseph LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "07e705b8ee144ceb5b9d7d45f1ac13ec6d197ae4",
          "message": "Generate manpage as part of build (#83)\n\n* Generate manpage via `clap_mangen`\r\n\r\n* Cleanup CLI docstrings",
          "timestamp": "2024-01-15T16:22:26-08:00",
          "tree_id": "9b101f39258fe6cda6ac0112bfeeee95f3284628",
          "url": "https://github.com/sirwart/ripsecrets/commit/07e705b8ee144ceb5b9d7d45f1ac13ec6d197ae4"
        },
        "date": 1705364843007,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 429440000,
            "range": "± 2516421",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lafreniere.xyz",
            "name": "Joseph LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ef54b36f79cf5323c83c031dd6936a7eefc0cec2",
          "message": "Add `publish-crate` step to release workflow (#85)\n\nAddresses #77.\r\n\r\nThis new step requires the presence of a GitHub Actions Secret named CRATES_IO_API_TOKEN with access to publish the ripsecrets crate.\r\n\r\nDependencies were updated to avoid versions that have been yanked.",
          "timestamp": "2024-02-24T10:08:13-08:00",
          "tree_id": "9fb2bc56143ea02db15240d96bc849ba7aa00a67",
          "url": "https://github.com/sirwart/ripsecrets/commit/ef54b36f79cf5323c83c031dd6936a7eefc0cec2"
        },
        "date": 1708798378177,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 389542762,
            "range": "± 6189103",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "bbf4388182e0859a36a150cc560ee7a2d4b4d564",
          "message": "Update Cargo.lock as well",
          "timestamp": "2024-04-19T17:15:56-07:00",
          "tree_id": "a5ccbf75eac2515d5f3cb369469b7b2bd93d9c86",
          "url": "https://github.com/sirwart/ripsecrets/commit/bbf4388182e0859a36a150cc560ee7a2d4b4d564"
        },
        "date": 1713572443294,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 398542457,
            "range": "± 3126043",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "033ec5192b738b6712701be920cba545c2775050",
          "message": "Update release date",
          "timestamp": "2024-04-20T08:39:46-07:00",
          "tree_id": "113771055ce45543ece2f789ad8d3840dbf239d0",
          "url": "https://github.com/sirwart/ripsecrets/commit/033ec5192b738b6712701be920cba545c2775050"
        },
        "date": 1713627871859,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 394360941,
            "range": "± 2747047",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "contact@alexandregv.fr",
            "name": "Alexandre GUIOT--VALENTIN",
            "username": "alexandregv"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4bdd9b058ee2fe8e51f10ab06c90266e900f45ef",
          "message": "Add intra42 client secret matcher (#86)\n\nintra42 is the intranet and API of \"42 School\", a CS school.\r\nThe API is open to all students in 57 campus around the world.\r\nIt is thus often subject to credentials leaks on GitHub\r\nSee https://42.fr and https://api.intra.42.fr/",
          "timestamp": "2024-05-12T08:52:59-07:00",
          "tree_id": "f08f1bcb73ed6a05b22f5e8a883cd7fff3f96e1c",
          "url": "https://github.com/sirwart/ripsecrets/commit/4bdd9b058ee2fe8e51f10ab06c90266e900f45ef"
        },
        "date": 1715529469183,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 401434657,
            "range": "± 4994902",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lafreniere.xyz",
            "name": "Joseph LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "23a79138d2a5bb441e68d7c7845bda3faef15f55",
          "message": "Update Nix inputs (#87)\n\n* flake.lock: Update\r\n\r\nFlake lock file updates:\r\n\r\n• Updated input 'advisory-db':\r\n    'github:rustsec/advisory-db/99eb308ec59409c437eb5c4f364717705b09c7e8' (2024-02-18)\r\n  → 'github:rustsec/advisory-db/1d209d3f18c740f104380e988b5aa8eb360190d1' (2024-08-08)\r\n• Updated input 'crane':\r\n    'github:ipetkov/crane/2c653e4478476a52c6aa3ac0495e4dea7449ea0e' (2024-02-11)\r\n  → 'github:ipetkov/crane/4c6c77920b8d44cd6660c1621dea6b3fc4b4c4f4' (2024-08-06)\r\n• Updated input 'flake-utils':\r\n    'github:numtide/flake-utils/1ef2e671c3b0c19053962c07dbda38332dcebf26' (2024-01-15)\r\n  → 'github:numtide/flake-utils/b1d9ab70662946ef0850d488da1c9019f3a9752a' (2024-03-11)\r\n• Updated input 'nixpkgs':\r\n    'github:NixOS/nixpkgs/1d21cbff6b9e7816b5daf8840129b075bef617a3' (2024-02-19)\r\n  → 'github:NixOS/nixpkgs/4e7d996aa858660e3261b4834ab00415cfe9b0fe' (2024-08-12)\r\n• Updated input 'pre-commit-hooks':\r\n    'github:cachix/pre-commit-hooks.nix/5df5a70ad7575f6601d91f0efec95dd9bc619431' (2024-02-15)\r\n  → 'github:cachix/pre-commit-hooks.nix/c7012d0c18567c889b948781bc74a501e92275d1' (2024-08-09)\r\n• Removed input 'pre-commit-hooks/flake-utils'\r\n• Removed input 'pre-commit-hooks/flake-utils/systems'\r\n• Updated input 'pre-commit-hooks/gitignore':\r\n    'github:hercules-ci/gitignore.nix/43e1aa1308018f37118e34d3a9cb4f5e75dc11d5' (2023-12-29)\r\n  → 'github:hercules-ci/gitignore.nix/637db329424fd7e46cf4185293b9cc8c88c95394' (2024-02-28)\r\n• Updated input 'pre-commit-hooks/nixpkgs':\r\n    'github:NixOS/nixpkgs/eabe8d3eface69f5bb16c18f8662a702f50c20d5' (2024-01-09)\r\n  → 'github:NixOS/nixpkgs/9693852a2070b398ee123a329e68f0dab5526681' (2024-06-22)\r\n• Updated input 'pre-commit-hooks/nixpkgs-stable':\r\n    'github:NixOS/nixpkgs/3dc440faeee9e889fe2d1b4d25ad0f430d449356' (2024-01-10)\r\n  → 'github:NixOS/nixpkgs/194846768975b7ad2c4988bdb82572c00222c0d7' (2024-07-07)\r\n• Updated input 'rust-overlay':\r\n    'github:oxalica/rust-overlay/d500e370b26f9b14303cb39bf1509df0a920c8b0' (2024-02-18)\r\n  → 'github:oxalica/rust-overlay/65e3dc0fe079fe8df087cd38f1fe6836a0373aad' (2024-08-12)\r\n• Removed input 'rust-overlay/flake-utils'\r\n\r\n* Update deprecated crane usage in Nix flake",
          "timestamp": "2024-08-15T09:38:13-07:00",
          "tree_id": "3e2172359bccbccb1e7c65a66570096e518b87b8",
          "url": "https://github.com/sirwart/ripsecrets/commit/23a79138d2a5bb441e68d7c7845bda3faef15f55"
        },
        "date": 1723740175908,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 404064668,
            "range": "± 3445172",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rui@chenrui.dev",
            "name": "Rui Chen",
            "username": "chenrui333"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c36598db831cd20bf5fb935d7085b71c6e8f62a2",
          "message": "feat: add shell completions support (#89)\n\nSigned-off-by: Rui Chen <rui@chenrui.dev>",
          "timestamp": "2024-12-25T15:04:29+01:00",
          "tree_id": "dd8a62aaf93752157972f271b1a5f2973880709e",
          "url": "https://github.com/sirwart/ripsecrets/commit/c36598db831cd20bf5fb935d7085b71c6e8f62a2"
        },
        "date": 1735135759981,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 409868740,
            "range": "± 1851072",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "60151818+jack-zhang-ai@users.noreply.github.com",
            "name": "Jack Zhang",
            "username": "jack-zhang-ai"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "58427dbf73e747be713d504bae924b1689b86127",
          "message": "Let secretsignore have the highest precedence (#93)\n\nCurrently, the secretsignore specified files are added with the lowest precedence, so if some other regular gitignore file happens to unignore some pattern (i.e. with !pattern), its not easy to have the ripsecrets ignore these files.\r\n\r\nThis PR changes the behavior so that the file patterns from the secretsignore have the highest precedence.",
          "timestamp": "2025-01-25T14:57:05-08:00",
          "tree_id": "1c508f83ff27dae8545a032575141d0880c5866f",
          "url": "https://github.com/sirwart/ripsecrets/commit/58427dbf73e747be713d504bae924b1689b86127"
        },
        "date": 1737846166791,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 414386125,
            "range": "± 3173521",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lafreniere.xyz",
            "name": "Joseph LaFreniere",
            "username": "lafrenierejm"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "9b43cd14a887b1727a8f13d03d99e4b3833f04f9",
          "message": "Update Flake inputs to account for Cargo v4 (#92)\n\nAlso remove unnecessary `write` call found by Clippy",
          "timestamp": "2025-01-25T16:19:40-08:00",
          "tree_id": "168f444e52f9e47108a99c03c7ac60928c133b09",
          "url": "https://github.com/sirwart/ripsecrets/commit/9b43cd14a887b1727a8f13d03d99e4b3833f04f9"
        },
        "date": 1737851025352,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 416211875,
            "range": "± 4900398",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "113128490+korikhin@users.noreply.github.com",
            "name": "Vladislav Korikhin",
            "username": "korikhin"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7877e35f2b839f2824fb17886c898d9a0fc67a5b",
          "message": "Regex fixes (#91)\n\nAdded JWT/JWE, Square secret matching",
          "timestamp": "2025-01-25T16:29:40-08:00",
          "tree_id": "ee31f05d711ed38d7925dc6bd0c01ad77669a899",
          "url": "https://github.com/sirwart/ripsecrets/commit/7877e35f2b839f2824fb17886c898d9a0fc67a5b"
        },
        "date": 1737851699933,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 17553022790,
            "range": "± 65346873",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "552bd04b501cbf1465fc5647a0f720744e385780",
          "message": "Use proper character class for AWS secrets (fixes #94)",
          "timestamp": "2025-03-13T21:41:43-07:00",
          "tree_id": "63e69d5a2e6a4e12a54537cfbf1bfc9681629e21",
          "url": "https://github.com/sirwart/ripsecrets/commit/552bd04b501cbf1465fc5647a0f720744e385780"
        },
        "date": 1741927672956,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 18225328334,
            "range": "± 297608573",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "d251faaa503dcff63cf2b66182c5ec25e2bbb8da",
          "message": "cargo lock versiom update",
          "timestamp": "2025-03-22T21:49:53-07:00",
          "tree_id": "b76b122b9bda00e2ca2e03b649d284064d442456",
          "url": "https://github.com/sirwart/ripsecrets/commit/d251faaa503dcff63cf2b66182c5ec25e2bbb8da"
        },
        "date": 1742705739031,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 18408285398,
            "range": "± 655688715",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "committer": {
            "email": "ohohvi@gmail.com",
            "name": "Brian Smith",
            "username": "sirwart"
          },
          "distinct": true,
          "id": "5aae33fe5b85009a4897994c2eb51d8813df7020",
          "message": "Update release date one more time",
          "timestamp": "2025-03-23T09:48:23-07:00",
          "tree_id": "d03780ed6da1d81447435c8a9bd0da847b85826c",
          "url": "https://github.com/sirwart/ripsecrets/commit/5aae33fe5b85009a4897994c2eb51d8813df7020"
        },
        "date": 1742748842839,
        "tool": "cargo",
        "benches": [
          {
            "name": "Find secrets in getsentry/sentry/find_secrets function",
            "value": 18767488987,
            "range": "± 413653085",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}