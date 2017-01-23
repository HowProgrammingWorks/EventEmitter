'use strict';

global.api = {};
api.events = require('events');

api.events.enhancedEventEmitter = () => {
  const ee = new api.events.EventEmitter();
  const emit = ee.emit;
  ee.emit = (...args) => {
    emit.apply(ee, args);
    args.unshift('*');
    emit.apply(ee, args);
  };
  return ee;
};
