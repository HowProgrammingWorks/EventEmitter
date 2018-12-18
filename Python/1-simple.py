from collections import defaultdict


class EventEmitter:
    def __init__(self):
        self._handlers = defaultdict(list)

    def on(self, name, func):
        self._handlers[name].append(func)

    def emit(self, name, *args, **kwargs):
        for func in self._handlers[name]:
            func(*args, **kwargs)


ee = EventEmitter()


def hello():
    print('hello')


def another_hello():
    print('another hello')


def print_sum(*args):
    print('sum =', sum(args))


if __name__ == '__main__':
    ee.on('hello', hello)
    ee.on('hello', another_hello)
    ee.on('another-hello', another_hello)
    ee.on('sum', print_sum)

    ee.emit('hello')
    ee.emit('another-hello')
    ee.emit('sum')
    ee.emit('sum', 1, 3, 4)
