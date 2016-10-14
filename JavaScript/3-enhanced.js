'use strict';

global.api = {};
api.events = require('events');

api.events.enhancedEventEmitter = () => {
  let ee = new api.events.EventEmitter(),
      emit = ee.emit;
  ee.emit = (...args) => {
    emit.apply(ee, args);
    args.unshift('*');
    emit.apply(ee, args);
  };
  return ee;
};
