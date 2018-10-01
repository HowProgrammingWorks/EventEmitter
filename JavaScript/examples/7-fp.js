'use strict';

const emitter = (events = {}) => ({
  on: (name, fn) => (events[name] = events[name] || []).push(fn),
  emit: (name, ...data) => (events[name] || []).forEach(fn => fn(...data))
});

// Usage

const ee = emitter();

ee.on('event1', data => {
  console.dir(data);
});

ee.emit('event1', { a: 5 });
