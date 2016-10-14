'use strict';

global.api = {};
require('./1-simple.js');

global.application = new EventEmitter();

application.on('smth', (data) => {
  console.dir(data);
});

application.emit('smth', { a: 5 });
