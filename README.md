# filter-async

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

## License

MIT
