import asyncio
from collections import defaultdict


class EventEmitter:
    def __init__(self):
        self._handlers = defaultdict(list)

    def on(self, name, func):
        self._handlers[name].append(func)

    async def emit(self, name, *args, **kwargs):
        for func in self._handlers[name]:
            await func(*args, **kwargs)


ee = EventEmitter()


async def hello():
    print('hello')


async def another_hello():
    print('another hello')


async def print_sum(*args):
    print('sum =', sum(args))


async def main():
    ee.on('hello', hello)
    ee.on('hello', another_hello)
    ee.on('another-hello', another_hello)
    ee.on('sum', print_sum)

    await ee.emit('hello')
    await ee.emit('another-hello')
    await ee.emit('sum')
    await ee.emit('sum', 1, 3, 4)


if __name__ == '__main__':
    asyncio.run(main())
