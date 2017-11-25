## Event Emitter object similar to Node.js Event Emitter

#### Written in python 3

### Usage example:

```python
from ee import EventEmitter

ee = EventEmitter()

ee.on('operations', lambda x, y: print(x+y))
ee.on('operations', lambda x, y: print(x-y))
ee.on('operations', lambda x, y: print(x*y))
ee.on('operations', lambda x, y: print(x/y))

ee.emit('operations', 10, 5)
```
