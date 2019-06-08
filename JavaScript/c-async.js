'use strict';

class AsyncEmitter {
  constructor() {
    this.events = new Map();
  }

  event(name) {
    let event = this.events.get(name);
    if (event) return event;
    const on = new Set();
    const once = new Set();
    event = { on, once };
    this.events.set(name, event);
    return event;
  }

  on(name, fn) {
    this.event(name).on.add(fn);
  }

  once(name, fn) {
    if (fn === undefined) {
      return new Promise(resolve => {
        this.once(name, resolve);
      });
    }
    this.event(name).once.add(fn);
    return null;
  }

  async emit(name, ...args) {
    const event = this.events.get(name);
    if (!event) return null;
    const { on, once } = event;
    const aon = [...on.values()];
    const aonce = [...once.values()];
    const promises = aon.concat(aonce).map(fn => fn(...args));
    once.clear();
    if (on.size === 0 && once.size === 0) {
      this.events.delete(name);
    }
    return Promise.all(promises);
  }

  remove(name, fn) {
    const { events } = this;
    const event = events.get(name);
    if (!event) return;
    const { on, once } = event;
    on.delete(fn);
    once.delete(fn);
    if (on.size === 0 && once.size === 0) {
      this.events.delete(name);
    }
  }

  clear(name) {
    const { events } = this;
    if (!name) {
      events.clear();
      return;
    }
    const event = events.get(name);
    if (event) events.delete(name);
  }

  count(name) {
    const event = this.events.get(name);
    if (!event) return 0;
    const { on, once } = event;
    return on.size + once.size;
  }

  listeners(name) {
    const event = this.events.get(name);
    if (!event) return [];
    const { on, once } = event;
    return [...on.values(), ...once.values()];
  }

  names() {
    return [...this.events.keys()];
  }
}

// Usage

const ee = new AsyncEmitter();

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
