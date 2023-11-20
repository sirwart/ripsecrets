{
  description =
    "A command-line tool to prevent committing secret keys into your source code";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";

    crane = {
      url = "github:ipetkov/crane";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    flake-utils.url = "github:numtide/flake-utils";

    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        flake-utils.follows = "flake-utils";
      };
    };

    advisory-db = {
      url = "github:rustsec/advisory-db";
      flake = false;
    };

    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
  };

  outputs = { self, nixpkgs, crane, flake-utils, rust-overlay, advisory-db
    , pre-commit-hooks }:
    {
      overlays.default =
        (final: prev: { inherit (self.packages.${final.system}) ripsecrets; });
    } // flake-utils.lib.eachDefaultSystem (system:
      let
        craneLib = crane.lib.${system};
        src = craneLib.cleanCargoSource ./.;

        pkgs = import nixpkgs {
          inherit system;
          overlays = [ (import rust-overlay) ];
        };

        buildInputs = [ ] ++ pkgs.lib.optionals pkgs.stdenv.isDarwin [
          # Additional darwin specific inputs can be set here
          pkgs.gcc
          pkgs.libiconv
        ];

        # Build *just* the cargo dependencies, so we can reuse
        # all of that work (e.g. via cachix) when running in CI
        cargoArtifacts = craneLib.buildDepsOnly { inherit src buildInputs; };

        # Build ripsecrets itself, reusing the dependency artifacts from above.
        ripsecrets = craneLib.buildPackage {
          inherit cargoArtifacts src buildInputs;
          doCheck = false;
          meta = with pkgs.lib; {
            description =
              "A command-line tool to prevent committing secret keys into your source code";
            homepage = "https://github.com/sirwart/ripsecrets";
            maintainers = [ maintainers.lafrenierejm ];
            license = licenses.mit;
          };
        };

        pre-commit = pre-commit-hooks.lib."${system}".run;
      in rec {
        packages = flake-utils.lib.flattenTree {
          # `nix build .#ripsecrets`
          inherit ripsecrets;
          # `nix build`
          default = ripsecrets;
          # Build an OCI image.
          # `nix build .#ripsecrets-oci`
          ripsecrets-oci = pkgs.dockerTools.buildImage {
            name = "ripsecrets";
            tag = "latest";
            config = {
              Entrypoint = [ "${ripsecrets}/bin/ripsecrets" ];
              WorkingDir = "/data";
              Volumes = { "/data" = { }; };
            };
          };
        };

        # `nix run`
        apps.default = flake-utils.lib.mkApp { drv = packages.ripsecrets; };

        # `nix flake check`
        checks = {
          audit = craneLib.cargoAudit { inherit src advisory-db; };

          clippy = craneLib.cargoClippy {
            inherit cargoArtifacts src buildInputs;
            cargoClippyExtraArgs = "--all-targets -- --deny warnings";
          };

          doc = craneLib.cargoDoc { inherit cargoArtifacts src; };

          fmt = craneLib.cargoFmt { inherit src; };

          nextest = craneLib.cargoNextest {
            inherit cargoArtifacts src buildInputs;
            partitions = 1;
            partitionType = "count";
          };

          pre-commit = pre-commit {
            src = ./.;
            hooks = {
              editorconfig-checker.enable = true;
              markdownlint.enable = true;
              mdsh.enable = true;
              nixfmt.enable = true;
              prettier = {
                enable = true;
                excludes = [ ".*.md" ];
              };
              rustfmt.enable = true;
              typos = {
                enable = true;
                excludes = [ "^test/one_per_file/.*" "^test/one_per_line/.*" ];
              };
            };
          };
        } // pkgs.lib.optionalAttrs (system == "x86_64-linux") {
          # NB: cargo-tarpaulin only supports x86_64 systems
          # Check code coverage (note: this will not upload coverage anywhere)
          ripsecrets-coverage =
            craneLib.cargoTarpaulin { inherit cargoArtifacts src; };
        };

        # `nix develop`
        devShells.default = pkgs.mkShell {
          inherit (self.checks.${system}.pre-commit) shellHook;
          inputsFrom = builtins.attrValues self.checks;
          buildInputs = buildInputs
            ++ (with pkgs; [ cargo clippy nixfmt rustc rustfmt ]);
          nativeBuildInputs = with pkgs;
            lib.optionals (system == "x86_64-linux") [ cargo-tarpaulin ];
        };
      });
}
