import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

/**
 * Simple event emitter that allows {@link Consumer}
 * objects to be registered as listeners.
 * Can emit events, register and delete listeners.
 *
 * @param <T> type of the listener's parameter
 */
public class SimpleEventEmitter<T> {
    /**
     * Map with all registered events and corresponding listeners.
     */
    private final Map<String, List<Consumer<T>>> events;

    /**
     * Constructs new SimpleEventEmitter.
     */
    public SimpleEventEmitter() {
        this.events = new HashMap<>();
    }

    /**
     * Adds new listener to the given event.
     *
     * @param name event's name
     * @param listener action listener
     */
    public void on(final String name, final Consumer<T> listener) {
        List<Consumer<T>> listeners = events.get(name);

        if (listeners != null) {
            listeners.add(listener);
        } else {
            listeners = new ArrayList<>();
            listeners.add(listener);
            events.put(name, listeners);
        }
    }

    /**
     * Fires event with given data, executing all event listeners.
     *
     * @param name event's name
     * @param data event's data
     */
    public void emit(final String name, final T data) {
        List<Consumer<T>> listeners = events.get(name);
        if (listeners != null) {
            for (Consumer<T> listener : listeners) {
                listener.accept(data);
            }
        }
    }

    /**
     * Removes event listener from specified event.
     *
     * @param name event's name
     * @param listener event listener
     * @return {@code true} if the event existed and the listener
     * was registered to that event, {@code false} otherwise
     */
    public boolean remove(final String name, final Consumer<T> listener) {
        List<Consumer<T>> listeners = events.get(name);
        if (listeners != null) {
            return listeners.remove(listener);
        }

        return false;
    }

    /**
     * Removes all event listeners from specified event.
     *
     * @param name event's name
     * @return {@code true} if the event existed, {@code false} otherwise
     */
    public boolean removeAll(final String name) {
        List<Consumer<T>> actions = events.remove(name);
        return actions != null;
    }


    /**
     * Entry point of the program, used for testing.
     *
     * @param args command-line arguments, not used
     */
    public static void main(final String[] args) {
        SimpleEventEmitter<String> eventEmitter = new SimpleEventEmitter<>();
        eventEmitter.on("something", System.out::println);
        eventEmitter.emit("something", "5");
    }
}
