window.BENCHMARK_DATA = {
  "lastUpdate": 1669696879058,
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
      }
    ]
  }
}