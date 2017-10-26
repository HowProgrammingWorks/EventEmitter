// Example 4: using emitters of single events.
//
// As we've seen in the previous example, using the statically typed
// `EventEmitter` gets pretty tedious when we need different payload types, so
// let's make the emitter represent a single event type. Then we can parametrize
// it with payload type easily, and we still can group events into
// EventEmitter-like entities using regular structs.

extern crate event_emitter;

use event_emitter::Event;

#[derive(Default)]
struct AppEvents {
    click: Event<(i32, i32)>,
    key_press: Event<char>,
    close: Event<()>,
}

fn main() {
    let mut events = AppEvents::default();

    events.click.subscribe(|&(x, y)| {
        println!("Clicked on ({}, {})", x, y);
    });

    events.key_press.subscribe(|key| {
        println!("Pressed \"{}\"", key);
    });

    events.close.subscribe(|_| {
        println!("Window closed, cleaning up");
    });

    events.key_press.emit('a');
    events.click.emit((100, 200));
    events.close.emit(());
}
