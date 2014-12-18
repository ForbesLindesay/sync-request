# sync-request

Make synchronous web requests with cross platform support.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/sync-request/master.svg)](https://travis-ci.org/ForbesLindesay/sync-request)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/sync-request.svg)](https://gemnasium.com/ForbesLindesay/sync-request)
[![NPM version](https://img.shields.io/npm/v/sync-request.svg)](https://www.npmjs.org/package/sync-request)

## Installation

    npm install sync-request

## Usage

```js
request(method, url, options)
```

e.g.

```js
var request = require('sync-request');
var res = request('GET', 'http://example.com');
console.log(res.getBody());
```

**Method:**

An HTTP method (e.g. `GET`, `POST`, `PUT`, `DELETE` or `HEAD`). It is not case sensitive.

**URL:**

A url as a string (e.g. `http://example.com`). Relative URLs are allowed in the browser.

**Options:**

 - `qs` - an object containing querystring values to be appended to the uri
 - `headers` - http headers (default: `{}`)
 - `body` - body for PATCH, POST and PUT requests.  Must be a `Buffer` or `String` (only strings are accepted client side)
 - `json` - sets `body` but to JSON representation of value and adds `Content-type: application/json`.  Does not have any affect on how the response is treated.
 - `cache` - Set this to `'file'` to enable a local cache of content.  A separate process is still spawned even for cache requests.  This option is only used if running in node.js
 - `followRedirects` - defaults to `true` but can be explicitly set to `false` on node.js to prevent then-request following redirects automatically.
 - `gzip` - defaults to `true` but can be explicitly set to `false` on node.js to prevent then-request automatically supporting the gzip encoding on responses.

**Returns:**

A `Response` object.

Note that even for status codes that represent an error, the request function will still return a response.  You can call `getBody` if you want to error on invalid status codes.  The response has the following properties:

 - `statusCode` - a number representing the HTTP status code
 - `headers` - http response headers
 - `body` - a string if in the browser or a buffer if on the server

It also has a method `res.getBody(encoding?)` which looks like:

```js
function getBody(encoding) {
  if (this.statusCode >= 300) {
    var err = new Error('Server responded with status code ' + this.statusCode + ':\n' + this.body.toString(encoding));
    err.statusCode = this.statusCode;
    err.headers = this.headers;
    err.body = this.body;
    throw err;
  }
  return encoding ? this.body.toString(encoding) : this.body;
}
```

## How is this possible?

Internally, this uses a separate worker process that is run using either [childProcess.spawnSync](http://nodejs.org/docs/v0.11.13/api/child_process.html#child_process_child_process_spawnsync_command_args_options) if available, or falling back to [spawn-sync](https://www.npmjs.org/package/spawn-sync) if not.  The fallback will attempt to install a native module for synchronous execution, and fall back to doing busy waiting for a file to exist.  All this ultimatley means that the module is totally cross platform and does not require native code compilation support.

The worker then makes the actual request using [then-request](https://www.npmjs.org/package/then-request) so this has almost exactly the same API as that.

This can also be used in a web browser via browserify because xhr has built in support for synchronous execution.  Note that this is not recommended as it will be blocking.

## License

  MIT
