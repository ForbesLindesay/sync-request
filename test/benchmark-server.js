var http = require('http');

http.createServer(function (req, res, next) {
  res.end('Hello World');
}).listen(3000);
