window.BENCHMARK_DATA = {
  "lastUpdate": 1670085949974,
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
      }
    ]
  }
}