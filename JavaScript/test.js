'use strict';

const assert = require('assert');
const emitter = require('./emitter.js');

const ee = emitter();

ee.on('smth', data => {
  assert.strictEqual(data.a, 5);
});

ee.on('*', (name, data) => {
  if (name === 'smth') {
    assert.strictEqual(data.a, 5);
  } else if (name === 'smth2') {
    assert.strictEqual(data.a, 500);
  } else if (name === '*') {
    assert.strictEqual(data.a, 700);
  } else {
    assert.fail('This should never happen');
  }
});

ee.emit('smth', { a: 5 });
ee.emit('smth2', { a: 500 });
ee.emit('*', { a: 700 });
