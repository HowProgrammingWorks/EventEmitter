'use strict';

const EventEmitter = function() {
  this.events = {/* hash of array of function */};
};

EventEmitter.prototype.on = function(name, fn) {
  const event = this.events[name] || [];
  this.events[name] = event;
  event.push(fn);
};

EventEmitter.prototype.emit = function(name, data) {
  const event = this.events[name];
  if (event) event.forEach(fn => fn(data));
};

module.exports = EventEmitter;
