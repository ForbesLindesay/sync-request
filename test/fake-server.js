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

var started =false;
exports.isStarted = function() { return started };

exports.start = function(cb) {
    server = app.listen($port, function () {
        started = true;
        console.log('nsmockup server started', $port);
        return cb && setTimeout(cb, 1000);
    });
};

exports.stop = function(cb) {
    server.close(function () {
        started = false;
        console.log('nsmockup server stopped', $port);
        return cb && setTimeout(cb, 1000);
    });
};

['get', 'post', 'put', 'delete'].forEach(function(method) {
    app.route('/internal-test')[method](function(req, res){
        res.send('ok');
    });
});