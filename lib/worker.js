'use strict';

var concat = require('concat-stream');
var request = require('then-request');
var JSON = require('./json-buffer');

process.stdin.pipe(concat(function (stdin) {
  var req = JSON.parse(stdin.toString());
  request(req.method, req.url, req.options).done(function (response) {
    process.stdout.write(JSON.stringify({success: true, response: response}));
  }, function (err) {
    process.stdout.write(JSON.stringify({
      success: false,
      error: {
        message: err.message
      }
    }));
  });
}));
