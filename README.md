# filter-async

![https://travis-ci.org/sorribas/filter-async.svg?branch=master](https://travis-ci.org/sorribas/filter-async.svg?branch=master)

Filter the elements of an array with an asynchronous predicate.

## Usage

```js
var filter = require('filter-async');
var fs = require('fs');

var isFile = function(file, callback) {
  fs.stat(file, function(err, stat) {
    if (err) return callback(err);
    cb(null, stat.isFile());
  });
};

filter(['some-file', 'some-other-file', 'some-directory'], isFile, function(err, files) {
  if (err) return console.log(err);
  console.log(files); // should print ['some-file, 'some-other-file'']
});
```

By default all the async predicates are run in a sequential manner, which means that elements
of the array are processed one at a time. If you  want to process them in parallel you can use
the `filter.parallel` function. It has the same interface as the filter function.

The `filter` function is also aliased to `filter.sequential`.

## License

MIT
