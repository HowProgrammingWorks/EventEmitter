'use strict';

class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
    this.wrappers = new Map();
  }

  on(name, fn) {
    let event = this.events.get(name);
    if (!event) {
      event = new Set();
      this.events.set(name, event);
    }
    event.add(fn);
  }

  once(name, fn) {
    const wrapper = (...args) => {
      this.remove(name, wrapper);
      return fn(...args);
    };
    this.wrappers.set(fn, wrapper);
    this.on(name, wrapper);
  }

  async emit(name, ...args) {
    const event = this.events.get(name);
    if (!event) return;
    const listeners = [...event.values()];
    const promises = listeners.map(fn => fn(...args));
    return Promise.all(promises);
  }

  remove(name, fn) {
    const event = this.events.get(name);
    if (!event) return;
    if (event.has(fn)) {
      event.delete(fn);
    } else {
      const wrapper = this.wrappers.get(fn);
      if (wrapper) event.delete(wrapper);
    }
    if (event.size === 0) this.events.delete(name);
  }

  clear(name) {
    if (name) this.events.delete(name);
    else this.events.clear();
  }

  count(name) {
    const event = this.events.get(name);
    return event ? event.size : 0;
  }

  listeners(name) {
    const event = this.events.get(name);
    return new Set(event);
  }

  names() {
    return [...this.events.keys()];
  }
}

// Usage

const ee = new AsyncEventEmitter();

(async () => {

  ee.on('e1', async () => {
    console.log('e1 listener 1');
  });

  ee.on('e1', async () => {
    console.log('e1 listener 2');
  });

  ee.on('e1', async () => {
    console.log('e1 listener 3');
  });

  ee.on('e2', async () => {
    console.log('e2 listener 1');
  });

  ee.on('e2', async () => {
    console.log('e2 listener 2');
  });

  console.log('begin');
  await ee.emit('e1');
  await ee.emit('e2');
  console.log('end');

})();
