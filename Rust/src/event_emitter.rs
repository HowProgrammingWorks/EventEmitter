use std::collections::HashMap;
use std::cmp::Eq;
use std::hash::Hash;

type HandlerPtr<T> = Box<Fn(&T)>;

/// Node.js-like event emitter.
///
/// # Example
///
/// ```
/// # use event_emitter::EventEmitter;
/// #
/// #[derive(Hash, Eq, PartialEq)]
/// enum Event {
///     A,
///     B,
/// }
///
/// let mut emitter = EventEmitter::new();
///
/// emitter.on(Event::A, |&data| {
///     assert_eq!("data for A", data);
/// });
///
/// emitter.on(Event::B, |&data| {
///     assert_eq!("data for B", data);
/// });
///
/// emitter.emit(Event::A, "data for A");
/// emitter.emit(Event::B, "data for B");
/// ```
pub struct EventEmitter<T: Hash + Eq, U> {
    handlers: HashMap<T, Vec<HandlerPtr<U>>>,
}

impl<T: Hash + Eq, U> EventEmitter<T, U> {
    /// Creates a new instance of `EventEmitter`.
    pub fn new() -> Self {
        Self {
            handlers: HashMap::new(),
        }
    }

    /// Registers function `handler` as a listener for `event`.  There may be
    /// multiple listeners for a single event.
    pub fn on<F>(&mut self, event: T, handler: F)
    where
        F: Fn(&U) + 'static,
    {
        let event_handlers =
            self.handlers.entry(event).or_insert_with(|| vec![]);
        event_handlers.push(Box::new(handler));
    }

    /// Invokes all listeners of `event`, passing a reference to `payload` as an
    /// argument to each of them.
    pub fn emit(&self, event: T, payload: U) {
        if let Some(handlers) = self.handlers.get(&event) {
            for handler in handlers {
                handler(&payload);
            }
        }
    }
}

impl<T: Hash + Eq, U> Default for EventEmitter<T, U> {
    fn default() -> Self {
        Self::new()
    }
}
