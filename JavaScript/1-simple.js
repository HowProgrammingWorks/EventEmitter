'use strict';

const EventEmitter = function() {
  this.events = {}; // hash of array of function
};

EventEmitter.prototype.on = function(name, fn) {
  const event = this.events[name];
  if (event) event.push(fn);
  else this.events[name] = [fn];
};

EventEmitter.prototype.emit = function(name, ...data) {
  const event = this.events[name];
  if (!event) return;
  for (const listener of event) listener(...data);
};

module.exports = EventEmitter;
