var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;
var thenRequest = require('then-request');
var syncRequest = require('../');

spawn(process.execPath, [require.resolve('./benchmark-server.js')], {input: new Buffer(0)});

let asyncDuration, syncDuration;
var ready = Promise.resolve(null);
var startAsync = Date.now();
for (var i = 0; i < 1000; i++) {
  ready = ready.then(function () {
    return thenRequest('get', 'http://localhost:3000');
  });
}
ready.then(function () {
  var endAsync = Date.now();
  asyncDuration = endAsync - startAsync;
  console.log('1000 async requests in: ' + asyncDuration);
  var startSync = Date.now();
  for (var i = 0; i < 500; i++) {
    syncRequest('get', 'http://localhost:3000');
  }
  var endSync = Date.now();
  syncDuration = endSync - startSync;
  console.log('1000 sync requests in: ' + syncDuration);
}).then(() => {
  if (syncDuration > (asyncDuration * 10)) {
    console.error('This is more than 10 times slower than using async requests, that is not good enough.');
    process.exit(1);
  }
}, function (err) {
  console.error(err.stack);
  process.exit(1);
});
ready = null;
