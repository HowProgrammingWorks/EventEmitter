from collections import defaultdict


class EventEmitter:
    def __init__(self):
        self._handlers = defaultdict(list)

    def on(self, name):
        def wrapper(func):
            self._handlers[name].append(func)
            return func
        return wrapper

    def emit(self, name, *args, **kwargs):
        for func in self._handlers[name]:
            func(*args, **kwargs)


ee = EventEmitter()


@ee.on('hello')
def hello():
    print('hello')


@ee.on('another-hello')
@ee.on('hello')
def another_hello():
    print('another hello')


@ee.on('sum')
def print_sum(*args):
    print('sum =', sum(args))


if __name__ == '__main__':
    ee.emit('hello')
    ee.emit('another-hello')
    ee.emit('sum')
    ee.emit('sum', 2, 2, 5)
