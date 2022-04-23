use criterion::{black_box, criterion_group, criterion_main, Criterion};
use ripsecrets::find_secrets;
use std::path::PathBuf;

fn criterion_benchmark(c: &mut Criterion) {
    let paths = &[PathBuf::from(".")];
    c.bench_function("find secrets self", |b| {
        b.iter(|| find_secrets(black_box(paths), false, false))
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
