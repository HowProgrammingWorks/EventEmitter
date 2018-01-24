'use strict';

const emitter = () => {
  const events = {};
  return {
    on: (name, fn) => {
      const event = events[name] || [];
      events[name] = event;
      event.push(fn);
    },
    emit: (name, data) => {
      const event = events[name];
      if (event) event.forEach(fn => fn(data));
    }
  };
};

const ee = emitter();

ee.on('smth', (data) => {
  console.dir(data);
});

ee.emit('smth', { a: 5 });
