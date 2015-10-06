'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    $port = 3030,
    server;

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// configure log
app.use(morgan('dev'));

var started = false;
exports.isStarted = function() { return started };

process.on('message', function(m) {
    console.log('CHILD got message:', m);
    if (m === 'start') {
        server = app.listen($port, function () {
            started = true;
            console.log('fake server started', $port);
            return process.send('started');// m.cb && setTimeout(m.cb, 1000);
        });
        server.on('connection', function() {
            console.log('opa connect');
        });

        server.on('close', function() {
            console.log('opa close');
        });
    }  else {
        server.close(function () {
            started = false;
            console.log('fake server stopped', $port);
            return process.send('closed') && process.exit(0);
        });
    }
});

['get', 'post', 'put', 'delete'].forEach(function(method) {
    app.route('/internal-test')[method](function(req, res){
        res.send('ok');
    });
});