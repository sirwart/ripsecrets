{
  description =
    "A command-line tool to prevent committing secret keys into your source code";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

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
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ (import rust-overlay) ];
        };
        inherit (pkgs) lib;

        craneLib = crane.lib.${system};
        src = craneLib.cleanCargoSource ./.;

        buildInputs = [ ] ++ lib.optionals pkgs.stdenv.isDarwin [
          # Additional darwin specific inputs can be set here
          pkgs.gcc
          pkgs.libiconv
        ];

        # Build *just* the cargo dependencies, so we can reuse
        # all of that work (e.g. via cachix) when running in CI
        cargoArtifacts = craneLib.buildDepsOnly { inherit src buildInputs; };

        # Build the ripsecrets itself, reusing the dependency artifacts from above.
        ripsecrets = craneLib.buildPackage {
          inherit cargoArtifacts src buildInputs;
          doCheck = false;
        };

        pre-commit = pre-commit-hooks.lib."${system}".run;
      in {
        # `nix build`
        packages.default = ripsecrets;

        # `nix build .#oci`
        packages.oci = pkgs.dockerTools.buildImage {
          name = "ripsecrets";
          tag = "latest";
          config = {
            Entrypoint = [ "${ripsecrets}/bin/ripsecrets" ];
            WorkingDir = "/data";
            Volumes = { "/data" = { }; };
          };
        };

        # `nix run`
        apps.default = flake-utils.lib.mkApp { drv = ripsecrets; };

        # `nix flake check`
        checks = {
          doc = craneLib.cargoDoc { inherit cargoArtifacts src; };

          audit = craneLib.cargoAudit { inherit src advisory-db; };

          nextest = craneLib.cargoNextest {
            inherit cargoArtifacts src buildInputs;
            partitions = 1;
            partitionType = "count";
          };

          pre-commit = pre-commit {
            src = ./.;
            hooks = {
              nixfmt.enable = true;
              rustfmt.enable = true;
              cargo-check.enable = true;
            };
          };
        } // lib.optionalAttrs (system == "x86_64-linux") {
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
            ++ (with pkgs; [ cargo nixfmt rustc rustfmt ]);
          nativeBuildInputs = with pkgs;
            lib.optionals (system == "x86_64-linux") [ cargo-tarpaulin ];
        };
      });
}
