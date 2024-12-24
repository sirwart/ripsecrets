include!("src/args.rs");

fn main() -> std::io::Result<()> {
    // Tell Cargo that if the given file changes, to rerun this build script.
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=src/args.rs");

    let out_dir =
        std::path::PathBuf::from(std::env::var_os("OUT_DIR").ok_or(std::io::ErrorKind::NotFound)?);

    let cmd = <Args as clap::CommandFactory>::command();

    // Generate man page
    let man = clap_mangen::Man::new(cmd.clone());
    let mut buffer: Vec<u8> = Default::default();
    man.render(&mut buffer)?;
    std::fs::write(out_dir.join("ripsecrets.1"), buffer)?;

    // Generate shell completions
    use clap::ValueEnum;
    for shell in clap_complete::Shell::value_variants() {
        clap_complete::generate_to(*shell, &mut cmd.clone(), "ripsecrets", &out_dir)?;
    }

    Ok(())
}
