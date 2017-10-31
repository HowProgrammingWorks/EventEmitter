from typing import List, Callable


def check_max_listeners(f):
    """
    Decorator that used to check is event have less count of listeners then self.__max_listeners
    """
    def wrapper(self, event, listener):
        if self.listener_count(event) >= self.get_max_listeners() != 0:
            raise Exception('Exceeded the maximum number of listeners - %s' % self.__max_listeners)
        return f(self, event, listener)
    return wrapper


class EventEmitter:
    """
    Python Event Emitter object, similar to the Event Emitter in Node.js
    """
    DEFAULT_MAX_LISTENERS = 5

    def __init__(self):
        self.__max_listeners = EventEmitter.DEFAULT_MAX_LISTENERS  # SET 0 to disable limit of listeners.
        self.__events = {}
        self.__events_once = {}

    @check_max_listeners
    def add_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        """
        Add listener that can be emitted many times to event in the start of the list
        """
        self.__events.setdefault(event, []).append(listener)
        return self

    # Node.js have identical methods with different names to solve compatibility problems
    on = add_listener

    @check_max_listeners
    def once(self, event: str, listener: Callable) -> 'EventEmitter':
        """
        Add listener that can be emitted once to event in the start of the list
        """
        self.__events_once.setdefault(event, []).append(listener)
        return self

    @check_max_listeners
    def prepend_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        """
        Add listener that can be emitted many times to event in the end of the list
        """
        self.__events.setdefault(event, []).insert(0, listener)
        return self

    @check_max_listeners
    def prepend_once_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        """
        Add listener that can be emitted once to event in the end of the list
        """
        self.__events_once.setdefault(event, []).insert(0, listener)
        return self

    def remove_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        """
        Remove one listener from the event
        """
        if event not in self.event_names():
            raise Exception('Event was not found')
        if listener not in self.listeners(event):
            raise Exception('Listener was not found')
        if listener in self.__events.get(event, []):
            self.__events[event].remove(listener)
        if listener in self.__events_once.get(event, []):
            self.__events_once[event].remove(listener)
        return self

    def remove_all_listener(self, event: str=None) -> 'EventEmitter':
        """
        Remove all listeners from the event
        """
        if event not in self.event_names():
            raise Exception('Event was not found')
        if event in self.__events.keys():
            del self.__events[event]
        if event in self.__events_once:
            del self.__events_once[event]
        return self

    def set_max_listeners(self, n: int) -> None:
        """
        Set max quantity of listeners of the event
        """
        if type(n) != int and n < 0:
            raise Exception('n must be int, and value must be > 0')
        self.__max_listeners = n

    def get_max_listeners(self) -> int:
        """
        Return max quantity of listeners of the event
        """
        return self.__max_listeners

    def listeners(self, event: str) -> List[Callable]:
        """
        Get all of listeners of the event
        """
        return [*self.__events.get(event, []), *self.__events_once.get(event, [])]

    def emit(self, event: str, *args, **kwargs) -> bool:
        """
        Emit all of listeners of the event
        """
        if event not in self.event_names():
            return False
        for e in self.__events.get(event, []):
            e(*args, **kwargs)
        for e in self.__events_once.get(event, []):
            e(*args, **kwargs)
            del self.__events_once[event]

        return False

    def listener_count(self, event: str) -> int:
        """
        Get count of listeners of the event
        """
        return len(self.__events.get(event, []))+len(self.__events_once.get(event,[]))

    def event_names(self) -> List[str]:
        """
        Get list of the event names
        """
        return list({*self.__events.keys(), *self.__events_once.keys()})