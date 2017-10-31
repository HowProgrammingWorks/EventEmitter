extern crate event_emitter;

use std::cell::RefCell;
use std::rc::Rc;

use event_emitter::Event;

#[derive(Default)]
struct Events {
    first: Event<i32>,
    second: Event<i32>,
}

#[test]
fn event() {
    let mut events = Events::default();

    let a_value = Rc::new(RefCell::new(0));
    let a_count = Rc::new(RefCell::new(0));
    let b_value = Rc::new(RefCell::new(0));

    {
        let a_value = Rc::clone(&a_value);

        events.first.subscribe(move |&value| {
            *a_value.borrow_mut() += value;
        });
    }

    {
        let a_count = Rc::clone(&a_count);

        events.first.subscribe(move |_| {
            *a_count.borrow_mut() += 1;
        });
    }

    {
        let b_value = Rc::clone(&b_value);

        events.second.subscribe(move |&value| {
            *b_value.borrow_mut() += value;
        });
    }

    events.first.emit(10);
    events.first.emit(20);
    events.second.emit(30);
    events.second.emit(40);

    assert_eq!(30, *a_value.borrow());
    assert_eq!(2, *a_count.borrow());
    assert_eq!(70, *b_value.borrow());
}
