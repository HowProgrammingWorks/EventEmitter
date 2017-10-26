// Example 1: an EventEmitter with events of type `GreetEvent` and payload of
// type `&str`.

extern crate event_emitter;

use event_emitter::EventEmitter;

#[derive(Debug, Copy, Clone, Hash, Eq, PartialEq)]
enum GreetEvent {
    SayHello,
    SayBye,
}

fn main() {
    let mut emitter = EventEmitter::new();

    emitter.on(GreetEvent::SayHello, |name| {
        println!("Hello, {}!", name);
    });

    emitter.on(GreetEvent::SayHello, |name| {
        println!("Someone said hello to {}.", name);
    });

    emitter.on(GreetEvent::SayBye, |name| {
        println!("Bye, {}, hope to see you again!", name);
    });

    emitter.emit(GreetEvent::SayHello, "Alex");
    emitter.emit(GreetEvent::SayBye, "Alex");
}
