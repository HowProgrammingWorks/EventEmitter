// Example 3: making the payload an enum too, so that we can use different
// payload types for different events. (We'll see how we can make this code more
// simple and readable by using a different abstraction in the next example.)

extern crate event_emitter;

use event_emitter::EventEmitter;

#[derive(Debug, Copy, Clone, Hash, Eq, PartialEq)]
enum Event {
    Click,
    KeyPress,
    Close,
}

#[derive(Debug, Clone)]
enum Payload {
    None,
    ClickCoords(i32, i32),
    KeyChar(char),
}

use Event::{Click, Close, KeyPress};
use Payload::{ClickCoords, KeyChar};

fn main() {
    let mut emitter = EventEmitter::new();

    emitter.on(Click, |payload| {
        let (x, y) = match *payload {
            ClickCoords(x, y) => (x, y),
            _ => unreachable!(),
        };
        println!("Clicked on ({}, {})", x, y);
    });

    emitter.on(KeyPress, |payload| {
        let key = match *payload {
            KeyChar(c) => c,
            _ => unreachable!(),
        };
        println!("Pressed \"{}\"", key);
    });

    emitter.on(Close, |_| {
        println!("Window closed, cleaning up");
    });

    emitter.emit(KeyPress, KeyChar('a'));
    emitter.emit(Click, ClickCoords(100, 200));
    emitter.emit(Close, Payload::None);
}
