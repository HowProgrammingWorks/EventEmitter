'use strict';

const events = require('events');

const emitter = () => {
  const ee = new events.EventEmitter();
  const emit = ee.emit;
  ee.emit = (...args) => {
    emit.apply(ee, args);
    args.unshift('*');
    emit.apply(ee, args);
  };
  return ee;
};

module.exports = emitter;
