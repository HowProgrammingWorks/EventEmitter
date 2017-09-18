'use strict';

const emitter = require('./3-enhanced.js');

const application = emitter();

application.on('smth', (data) => {
  console.log('Certain event');
  console.dir(data);
});

application.on('*', (name, data) => {
  console.log('Any event');
  console.dir([name, data]);
});

application.emit('smth', { a: 5 });
application.emit('smth2', { a: 500 });
application.emit('*', { a: 700 });
