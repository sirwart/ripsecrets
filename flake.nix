{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    naersk.url = "github:nix-community/naersk";
  };

  outputs = { self, nixpkgs, flake-utils, naersk }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages."${system}";
        naersk-lib = naersk.lib."${system}";
      in
        rec {
          # `nix build`
          packages.ripsecrets = naersk-lib.buildPackage {
            pname = "ripsecrets";
            root = ./.;
            doCheck = true;
            checkInputs = [ pkgs.nix ];
          };
          defaultPackage = packages.ripsecrets;

          # `nix run`
          apps.ripsecrets = flake-utils.lib.mkApp {
            drv = packages.ripsecrets;
          };
          defaultApp = apps.ripsecrets;

          # `nix develop`
          devShell = pkgs.mkShell {
            nativeBuildInputs = with pkgs; [ cargo gnuplot libiconv rustc ];
          };
        }
    );
}
