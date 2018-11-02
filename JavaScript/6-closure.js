'use strict';

const emitter = () => {
  const events = {};
  return {
    on: (name, fn) => {
      const event = events[name];
      if (event) event.push(fn);
      else events[name] = [fn];
    },
    emit: (name, ...data) => {
      const event = events[name];
      if (event) event.forEach(fn => fn(...data));
    }
  };
};

// Usage

const ee = emitter();

ee.on('event1', data => {
  console.dir(data);
});

ee.emit('event1', { a: 5 });
