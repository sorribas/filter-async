var each = require('each-series');

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

module.exports = filter;
