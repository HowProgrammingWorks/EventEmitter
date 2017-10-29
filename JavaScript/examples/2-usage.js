'use strict';

const EventEmitter = require('./1-simple.js');

const ee = new EventEmitter();

ee.on('smth', (data) => {
  console.dir(data);
});

ee.emit('smth', { a: 5 });
