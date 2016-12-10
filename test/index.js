'use strict';
var child = require('child_process'),
    fork = child.fork,
    server = fork(__dirname+ '/fake-server');

server.on('message', function(m) {
    if (m === 'started') {
        console.log('#############################');
        console.log('#### init internal test #####');
        console.log('#############################');

        require('./internal-test');
        require('./internal-helper-method-test');

        server.send('stop');
    } else {
        console.log('#############################');
        console.log('#### init external test #####');
        console.log('#############################');

        require('./external-test');
        require('./external-helper-method-test');

        process.exit(0);
    }
});
server.send('start');
