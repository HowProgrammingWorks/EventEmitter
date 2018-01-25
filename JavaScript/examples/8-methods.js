'use strict';

const emitter = (l, o) => (l = {}, o = {
  on: (n, f) => (l[n] = l[n] || []).push(f),
  emit: (n, ...d) => (l[n] || []).map(f => f(...d)),
  once: (n, f, g) => o.on(n, g = (...a) => (f(...a), o.remove(n, g))),
  remove: (n, f, e) => (e = l[n] || [], e.splice(e.indexOf(f), 1)),
  clear: (n) => (n ? l[n] = [] : l = {}),
  count: (n) => (l[n] || []).length
});

// Usage

const ee = emitter();

// on and emit

ee.on('e1', (data) => {
  console.dir(data);
});

ee.emit('e1', { msg: 'e1 ok' });

// once

ee.once('e2', (data) => {
  console.dir(data);
});

ee.emit('e2', { msg: 'e2 ok' });
ee.emit('e2', { msg: 'e2 not ok' });

// remove

const f3 = (data) => {
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
