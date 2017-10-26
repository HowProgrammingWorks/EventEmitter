// Example 2: an EventEmitter with both events and payload being string slices.
//
// Note: the purpose of this example is just to demonstrate that it works and
// that our EventEmitter is generic enough to handle this. However, it is more
// of a counter-example that shows how you should not write code in Rust.
// Instead, leverage the type system. Create an enum with possible event types
// (see the previous example), and use it with all of the static correctness
// guarantees. Avoid so called "stringly-typed APIs" in statically typed
// languages.

extern crate event_emitter;

use event_emitter::EventEmitter;

fn main() {
    let mut emitter = EventEmitter::new();

    emitter.on("hello", |name| {
        println!("Hello, {}!", name);
    });

    emitter.on("hello", |name| {
        println!("Someone said hello to {}.", name);
    });

    emitter.on("bye", |name| {
        println!("Bye, {}, hope to see you again!", name);
    });

    emitter.emit("hello", "Alex");
    emitter.emit("bye", "Alex");
}
