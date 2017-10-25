# Event Emitter

## Event Emitter object similar to Node.js Event Emitter

### Usage example:

```python
from ee import EventEmitter

ee = EventEmitter()

ee.on('operations', lambda x, y: print(str(x+y)))
ee.on('operations', lambda x, y: print(str(x-y)))
ee.on('operations', lambda x, y: print(str(x*y)))
ee.on('operations', lambda x, y: print(str(x/y)))

ee.emit('operations', 10, 5)
```