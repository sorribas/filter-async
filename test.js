var test = require('tape');
var filter = require('./');

var values = {
  'a': true,
  'b': true,
  'c': false,
  'd': false,
};

var get = function(letter, cb) {
  setTimeout(function() {
    cb(null, values[letter]);
  },10);
};

test('basic', function(t) {
  filter(['a', 'b', 'c', 'd'], get, function(err, result) {
    t.deepEqual(result, ['a', 'b']);
    t.end();
  });
});
