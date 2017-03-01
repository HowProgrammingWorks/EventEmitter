'use strict';

global.api = {};
require('./3-enhanced.js');

global.application = api.events.enhancedEventEmitter();

application.on('smth', (data) => {
  console.dir(data);
});

application.on('*', (name, data) => {
  console.dir([name, data]);
});

application.emit('smth', { a: 5 });
application.emit('smth2', { a: 500 });
application.emit('*', { a: 500 });
