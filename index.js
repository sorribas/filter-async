var each = require('each-series');
var afterAll = require('after-all');

var filter = function(xs, predicate, cb) {
  var results = [];
  each(xs, function(x, i, done) {
    predicate(x, function(err, bool) {
      if (err) return done(err);
      if (bool) results.push(x);
      done();
    });
  }, function(err) {
    if (err) return cb(err);
    cb(null, results);
  });
};

filter.parallel = function(xs, predicate, cb) {
  var results = [];
  var next = afterAll(function(err) {
    if (err) return cb(err);
    cb(null, results.sort(function(a, b) {
      return a.index - b.index;
    }).map(function(x) {
      return x.val;
    }));
  });
  xs.forEach(function(x, i) {
    predicate(x, next(function(err, bool) {
      if (err) return;
      if (bool) results.push({val: x, index: i});
    }));
  });
};

filter.sequential = filter;
module.exports = filter;
