{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    naersk.url = "github:nix-community/naersk";
  };

  outputs = { self, nixpkgs, flake-utils, naersk }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages."${system}";
        naersk-lib = naersk.lib."${system}";
      in
        rec {
          # `nix build`
          packages.secrets = naersk-lib.buildPackage {
            pname = "secrets";
            root = ./.;
          };
          defaultPackage = packages.secrets;

          # `nix run`
          apps.secrets = flake-utils.lib.mkApp {
            drv = packages.secrets;
          };
          defaultApp = apps.secrets;

          # `nix develop`
          devShell = pkgs.mkShell {
            nativeBuildInputs = with pkgs; [ rustc cargo libiconv ];
          };
        }
    );
}
