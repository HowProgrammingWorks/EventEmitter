'use strict';

const emitter = () => {
  const events = new Map();
  const wrapped = new Map();
  const ee = {
    on: (name, f, timeout = 0) => {
      const event = events.get(name);
      if (event) event.push(f);
      else events.set(name, [f]);
      if (timeout) setTimeout(() => {
        ee.remove(name, f);
      }, timeout);
    },
    emit: (name, ...data) => {
      const event = events.get(name);
      if (event) event.forEach(f => f(...data));
    },
    once: (name, f) => {
      const g = (...a) => {
        ee.remove(name, g);
        f(...a);
      };
      wrapped.set(f, g);
      ee.on(name, g);
    },
    remove: (name, f) => {
      const event = events.get(name);
      if (!event) return;
      let i = event.indexOf(f);
      if (i !== -1) {
        event.splice(i, 1);
        return;
      }
      const g = wrapped.get(f);
      if (g) {
        i = event.indexOf(g);
        if (i !== -1) event.splice(i, 1);
        if (!event.length) events.delete(name);
      }
    },
    clear: name => {
      if (name) events.delete(name);
      else events.clear();
    },
    count: name => {
      const event = events.get(name);
      return event ? event.length : 0;
    },
    listeners: name => {
      const event = events.get(name);
      return event.slice();
    },
    names: () => [...events.keys()]
  };
  return ee;
};

// Usage

const ee = emitter();

// on and emit

ee.on('e1', data => {
  console.dir(data);
});

ee.emit('e1', { msg: 'e1 ok' });

// once

ee.once('e2', data => {
  console.dir(data);
});

ee.emit('e2', { msg: 'e2 ok' });
ee.emit('e2', { msg: 'e2 not ok' });

// remove

const f3 = data => {
  console.dir(data);
};

ee.on('e3', f3);
ee.remove('e3', f3);
ee.emit('e3', { msg: 'e3 not ok' });

// count

ee.on('e4', () => {});
ee.on('e4', () => {});
console.log('e4 count', ee.count('e4'));

// clear

ee.clear('e4');
ee.emit('e4', { msg: 'e4 not ok' });
ee.emit('e1', { msg: 'e1 ok' });

ee.clear();
ee.emit('e1', { msg: 'e1 not ok' });

// listeners and names

ee.on('e5', () => {});
ee.on('e5', () => {});
ee.on('e6', () => {});
ee.on('e7', () => {});

console.log('listeners', ee.listeners('e5'));
console.log('names', ee.names());
