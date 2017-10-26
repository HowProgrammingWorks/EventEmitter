# EventEmitter Example in Rust

[\[docs\]](https://doc-oqwooorcsj.now.sh/event\_emitter/)

![Ferris the Crab](https://camo.githubusercontent.com/3116127f2324db6e99bf00425e6808132a810624/68747470733a2f2f7a696d6167652e676c6f62616c2e73736c2e666173746c792e6e65742f3f75726c3d687474703a2f2f7777772e72757374616365616e2e6e65742f6173736574732f72757374616365616e2d666c61742d68617070792e706e6726773d323030)

## Installing Rust

Download `rustup` from <https://rustup.rs> and run

```console
rustup install stable
```

## Running examples

Run `cargo run --example name_of_the_example`. E.g.:

```console
cargo run --example example1
```

## Running tests

There are two types of tests that are used in this crate: integration tests (the
reside in the `tests/` directory) and doc-tests (in Rust, examples in
documentation are tests too).  Besides these, `cargo` also supports unit tests,
but there aren't any examples of them in this project.

Type

```console
cargo test
```

to run all the tests of all types that are present in the project.

## Building documentation

```console
cargo doc
```

will build the documentation, and

```console
cargo doc --open
```

will build it and open it in your browser.

## Contributing

Formatting your code using [rustfmt-nightly][] and fixing [clippy][] warnings,
if there are any, is much appreciated 🐱

Please note that, at the time of writing, you need a nightly compiler for these:

```console
rustup install nightly
cargo +nightly install rustfmt-nightly clippy

cargo +nightly fmt
cargo +nightly clippy
```

[clippy]: https://github.com/rust-lang-nursery/rust-clippy
[rustfmt-nightly]: https://github.com/rust-lang-nursery/rustfmt
