extern crate event_emitter;

use std::cell::RefCell;
use std::rc::Rc;

use event_emitter::EventEmitter;

#[derive(Hash, Eq, PartialEq)]
enum Event {
    A,
    B,
}

#[test]
fn event_emitter() {
    let mut emitter = EventEmitter::new();

    let a_value = Rc::new(RefCell::new(0));
    let a_count = Rc::new(RefCell::new(0));
    let b_value = Rc::new(RefCell::new(0));

    {
        let a_value = Rc::clone(&a_value);

        emitter.on(Event::A, move |&value| {
            *a_value.borrow_mut() += value;
        });
    }

    {
        let a_count = Rc::clone(&a_count);

        emitter.on(Event::A, move |_| {
            *a_count.borrow_mut() += 1;
        });
    }

    {
        let b_value = Rc::clone(&b_value);

        emitter.on(Event::B, move |&value| {
            *b_value.borrow_mut() += value;
        });
    }

    emitter.emit(Event::A, 10);
    emitter.emit(Event::A, 20);
    emitter.emit(Event::B, 30);
    emitter.emit(Event::B, 40);

    assert_eq!(30, *a_value.borrow());
    assert_eq!(2, *a_count.borrow());
    assert_eq!(70, *b_value.borrow());
}
