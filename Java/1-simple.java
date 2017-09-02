import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;
import java.util.function.Consumer;

/**
 * Simple event emitter that allows {@link Consumer}
 * objects to be registered as listeners.
 * Can emit events, register and delete listeners.
 *
 * @param <T> type of the listener's parameter
 */
class SimpleEventEmitter<T> {
    /**
     * Map with all registered events and corresponding listeners.
     */
    private final Map<String, List<Consumer<T>>> events;

    protected SimpleEventEmitter() {
        this.events = new HashMap<>();
    }

    /**
     * Adds new listener to the given event.
     *
     * @param name     event's name
     * @param listener action listener
     */
    public void on(final String name, final Consumer<T> listener) {
        List<Consumer<T>> listeners = Optional.ofNullable(events.get(name))
                .orElseGet(ArrayList::new);
        listeners.add(listener);
        events.put(name, listeners);
    }

    /**
     * Fires event with given data, executing all event listeners.
     *
     * @param name event's name
     * @param data event's data
     */
    public void emit(final String name, final T data) {
        Optional.ofNullable(events.get(name))
                .ifPresent((listeners) -> listeners
                        .forEach((listener) -> listener.accept(data)));
    }

    /**
     * Removes event listener from specified event.
     *
     * @param name     event's name
     * @param listener event listener
     * @return {@code true} if the event existed and the listener
     * was registered to that event, {@code false} otherwise
     */
    public boolean remove(final String name, final Consumer<T> listener) {
        return Optional.ofNullable(events.get(name))
                .map((listeners) -> listeners.remove(listener))
                .orElse(false);
    }

    /**
     * Removes all event listeners from specified event.
     *
     * @param name event's name
     * @return {@code true} if the event existed, {@code false} otherwise
     */
    public boolean removeAll(final String name) {
        return events.remove(name) != null;
    }
}
