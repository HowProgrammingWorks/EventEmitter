'use strict';

const EventEmitter = require('./1-simple.js');

const application = new EventEmitter();

application.on('smth', (data) => {
  console.dir(data);
});

application.emit('smth', { a: 5 });
