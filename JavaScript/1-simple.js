'use strict';

global.EventEmitter = function() {
  this.events = {/* hash of array of function */};
};

EventEmitter.prototype.on = function(name, callback) {
  this.events[name] = this.events[name] || [];
  this.events[name].push(callback);
};

EventEmitter.prototype.emit = function(name, data) {
  let event = this.events[name];
  if (event) event.forEach((callback) => {
    callback(data);
  });
};
