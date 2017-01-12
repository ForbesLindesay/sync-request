'use strict';

const net = require('net');
const concat = require('concat-stream');
const request = require('then-request');
const JSON = require('./json-buffer');

const server = net.createServer({allowHalfOpen: true}, c => {
  function respond(data) {
    c.end(JSON.stringify(data));
  }

  c.pipe(concat(function (stdin) {
    const str = stdin.toString('utf8');
    if (str === 'ping') {
      c.end('pong');
      return;
    }
    try {
      const req = JSON.parse(stdin.toString());
      request(req.method, req.url, req.options).done(function (response) {
        respond({success: true, response: response});
      }, function (err) {
        respond({success: false, error: { message: err.message }});
      });
    } catch (ex) {
      respond({success: false, error: { message: ex.message }});
    }
  }));
});

server.listen(+process.argv[2]);
