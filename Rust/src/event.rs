/// Single event emitter.
///
/// Contrary to the Node.js-like `EventEmitter`, this one isn't parametrized
/// with the event type, because it, basically, represents the event itself.
///
/// Such design gives us more flexibility without sacrificing type safety.
/// Events that are logically bound together can still be grouped into, e.g., a
/// struct, but they don't have to share the same payload type.
///
/// # Examples
///
/// ```
/// # use event_emitter::Event;
/// #
/// #[derive(Default)]
/// struct Events {
///     first: Event<&'static str>,
///     second: Event<i32>,
/// }
///
/// let mut events = Events::default();
///
/// events.first.subscribe(|&data| {
///     assert_eq!("data for a", data);
/// });
///
/// events.second.subscribe(|&data| {
///     assert_eq!(42, data);
/// });
///
/// events.first.emit("data for a");
/// events.second.emit(42);
/// ```
pub struct Event<T> {
    handlers: Vec<Box<Fn(&T)>>,
}

impl<T> Event<T> {
    /// Creates a new event with no handlers.
    pub fn new() -> Self {
        Self { handlers: vec![] }
    }

    /// Registers an event handler. There may be more that one handler at a
    /// time.
    pub fn subscribe<F>(&mut self, handler: F)
    where
        F: Fn(&T) + 'static,
    {
        self.handlers.push(Box::new(handler));
    }

    /// Fires the event, passing the `payload` as an argument of each event
    /// handler.
    pub fn emit(&self, payload: T) {
        for handler in &self.handlers {
            handler(&payload);
        }
    }
}

impl<T> Default for Event<T> {
    fn default() -> Self {
        Self::new()
    }
}
