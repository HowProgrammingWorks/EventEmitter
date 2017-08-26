'use strict';

const emitter = require('./3-enhanced.js');

const application = emitter();

application.on('smth', (data) => {
  console.dir(data);
});

application.on('*', (name, data) => {
  console.dir([name, data]);
});

application.emit('smth', { a: 5 });
application.emit('smth2', { a: 500 });
application.emit('*', { a: 700 });
