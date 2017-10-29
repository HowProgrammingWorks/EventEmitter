'use strict';

const emitter = require('./3-enhanced.js');

const ee = emitter();

ee.on('smth', (data) => {
  console.log('Certain event');
  console.dir(data);
});

ee.on('*', (name, data) => {
  console.log('Any event');
  console.dir([name, data]);
});

ee.emit('smth', { a: 5 });
ee.emit('smth2', { a: 500 });
ee.emit('*', { a: 700 });
