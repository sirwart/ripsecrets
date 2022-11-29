{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    naersk.url = "github:nix-community/naersk";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
  };

  outputs = { self, nixpkgs, flake-utils, naersk, pre-commit-hooks }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages."${system}";
        naersk-lib = naersk.lib."${system}";
        pre-commit = pre-commit-hooks.lib."${system}".run;
      in rec {
        # `nix build`
        packages.ripsecrets = naersk-lib.buildPackage {
          pname = "ripsecrets";
          root = ./.;
          doCheck = true;
          checkInputs = [ pkgs.nix ];
        };
        defaultPackage = packages.ripsecrets;

        # `nix run`
        apps.ripsecrets = flake-utils.lib.mkApp { drv = packages.ripsecrets; };
        defaultApp = apps.ripsecrets;

        checks = {
          build = self.defaultPackage.${system};
          pre-commit-check = pre-commit {
            src = ./.;
            hooks = {
              nixfmt.enable = true;
              rustfmt.enable = true;
              cargo-check.enable = true;
            };
          };
        };

        # `nix develop`
        devShell = pkgs.mkShell {
          inherit (self.checks.${system}.pre-commit-check) shellHook;
          nativeBuildInputs = with pkgs; [
            cargo
            gcc
            libiconv
            nixfmt
            rustc
            rustfmt
          ];
        };
      });
}
