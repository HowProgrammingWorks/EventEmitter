/**
 * Example of using SimpleEventEmitter.
 */
final class SimpleEventEmitterUsage {
    /**
     * Private constructor prevents class from being instantiated.
     */
    private SimpleEventEmitterUsage() {

    }

    /**
     * Entry point of the program.
     *
     * @param args command-line arguments, not used
     */
    public static void main(final String[] args) {
        SimpleEventEmitter<String> eventEmitter = new SimpleEventEmitter<>();
        eventEmitter.on("something", System.out::println);
        eventEmitter.emit("something", "5");
    }
}
