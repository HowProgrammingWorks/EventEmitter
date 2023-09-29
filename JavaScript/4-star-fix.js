'use strict';

const events = require('node:events');

const emitter = () => {
  const ee = new events.EventEmitter();
  const emit = ee.emit;
  ee.emit = (...args) => {
    const [name] = args;
    if (name === '*') throw new Error('Event name "*" is reserved');
    emit.apply(ee, args);
    args.unshift('*');
    emit.apply(ee, args);
  };
  return ee;
};

module.exports = emitter;
