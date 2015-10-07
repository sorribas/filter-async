var test = require('tape');
var filter = require('./');

var values = {
  'a': true,
  'b': false,
  'c': false,
  'd': true,
};

var getSeq = (function() {
  var running = false;
  return function(letter, cb) {
    if (running) throw new Error('Not called sequentially.');
    running = true;
    setTimeout(function() {
      running = false;
      cb(null, values[letter]);
    },10);
  };
})();

var getPar = (function() {
  var running = 0;
  var calls = 0;
  return function(letter, cb) {
    running++;
    calls++;
    if (running !== calls) throw new Error('Not called in parallel.');
    setTimeout(function() {
      running--;
      cb(null, values[letter]);
    },10);
  };
})();

test('sequential', function(t) {
  filter(['a', 'b', 'c', 'd'], getSeq, function(err, result) {
    t.deepEqual(result, ['a', 'd']);
    t.end();
  });
});

test('parallel', function(t) {
  filter.parallel(['a', 'b', 'c', 'd'], getPar, function(err, result) {
    t.deepEqual(result, ['a', 'd']);
    t.end();
  });
});
