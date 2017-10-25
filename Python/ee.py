from typing import List, Callable


class EventEmitter:
    """
    Python Event Emitter object, similar to the Event Emitter in Node.js
    """
    DEFAULT_MAX_LISTENERS = 5

    def __init__(self):
        self.__max_listeners = EventEmitter.DEFAULT_MAX_LISTENERS  # SET -1 to disable limit of listeners.
        self.__events = {}
        self.__events_once = {}

    def add_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        if event in self.__events:
            if self.listener_count(event) >= self.__max_listeners != -1:
                raise Exception('Exceeded the maximum number of listeners - %s' % self.__max_listeners)
            self.__events[event].append(listener)
        else:
            self.__events[event] = [listener, ]
        return self

    def on(self, event: str, listener: Callable) -> 'EventEmitter':
        if event in self.__events:
            if self.listener_count(event) >= self.__max_listeners != -1:
                raise Exception('Exceeded the maximum number of listeners - %s' % self.__max_listeners)
            self.__events[event].append(listener)
        else:
            self.__events[event] = [listener, ]

        return self

    def once(self, event: str, listener: Callable) -> 'EventEmitter':
        if event in self.__events_once:
            if self.listener_count(event) >= self.__max_listeners != -1:
                raise Exception('Exceeded the maximum number of listeners - %s' % self.__max_listeners)
            self.__events_once[event].append(listener)
        else:
            self.__events_once[event] = [listener, ]

        return self

    def prepend_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        if event in self.__events:
            if self.listener_count(event) >= self.__max_listeners != -1:
                raise Exception('Exceeded the maximum number of listeners - %s' % self.__max_listeners)
            self.__events[event] = [listener, *self.__events[event]]
        else:
            self.__events[event] = [listener, ]
        return self

    def prepend_once_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        if event in self.__events_once:
            if self.listener_count(event) >= self.__max_listeners != -1:
                raise Exception('Exceeded the maximum number of listeners - %s' % self.__max_listeners)
            self.__events_once[event] = [listener, *self.__events_once[event]]
        else:
            self.__events_once[event] = [listener, ]
        return self

    def remove_listener(self, event: str, listener: Callable) -> 'EventEmitter':
        _flag_l = False
        _flag_e = False

        if event in self.__events:
            if listener in self.__events[event]:
                self.__events[event].remove(listener)
                _flag_l = True
            _flag_e = True

        if event in self.__events_once:
            if listener in self.__events_once[event]:
                self.__events_once[event].remove(listener)
                _flag_l = True
            _flag_e = True

        if not _flag_e:
            raise Exception('Event was not found')

        if not _flag_l:
            raise Exception('Listener was not found')

        return self

    def remove_all_listener(self, event: str=None) -> 'EventEmitter':
        _flag_e = False

        if event in self.__events:
            del self.__events[event]
            _flag_e = True

        if event in self.__events_once:
            del self.__events_once[event]
            _flag_e = True

        if not _flag_e:
            raise Exception('Event was not found with name - %s' % event)

        return self

    def set_max_listeners(self, n: int) -> None:
        if type(n) != int and n < 0:
            raise Exception('n must be int, and value must be > 0')
        self.__max_listeners = n

    def get_max_listeners(self) -> int:
        return self.__max_listeners

    def listeners(self, event: str) -> List[Callable]:
        events = []
        if event in self.__events:
            events += self.__events[event]
        if event in self.__events_once:
            events += self.__events_once[event]

        return events

    def emit(self, event: str, *args, **kwargs) -> bool:
        _flag = False
        if event in self.__events:
            for e in self.__events[event]:
                e(*args, **kwargs)
            _flag = True

        if event in self.__events_once:
            for e in self.__events_once[event]:
                e(*args, **kwargs)
            del self.__events_once[event]
            _flag = True

        return _flag

    def listener_count(self, event: str) -> int:
        events_count = 0
        if event in self.__events:
            events_count += len(self.__events[event])
        if event in self.__events_once:
            events_count += len(self.__events_once[event])
        return events_count

    def event_names(self) -> List[str]:
        return [k for k, v in self.__events.items()] + [k for k, v in self.__events_once]
