use criterion::{black_box, criterion_group, criterion_main, Criterion};
use ripsecrets::find_secrets;
use std::path::PathBuf;
use std::time::Duration;

fn criterion_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("Find secrets in self");
    group
        .sample_size(150)
        .measurement_time(Duration::new(15, 0));
    let paths = &[PathBuf::from(".")];

    group.bench_function("find_secrets function", |b| {
        b.iter(|| find_secrets(black_box(paths), false, false))
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
