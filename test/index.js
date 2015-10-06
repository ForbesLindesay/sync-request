'use strict';

var server = require('./fake-server');

server.start(function() {
    console.log('#############################');
    console.log('#### init interal test ######');
    console.log('#############################');

    require('./internal-test');

    server.stop(function() {

        console.log('#############################');
        console.log('#### init external test #####');
        console.log('#############################');

        require('./external-test');

        process.exit(0);
    })
});
