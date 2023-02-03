window.BENCHMARK_DATA = {
  "lastUpdate": 1675438704939,
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
      }
    ]
  }
}