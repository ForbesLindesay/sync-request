var request = require('../');

// Test GET request
console.dir('http://nodejs.org');
var responseFromGet = request.get('http://nodejs.org');

console.log(responseFromGet);
console.log("Reponse Body Length: ", responseFromGet.getBody().length);

// Test HTTPS POST request
console.dir('https://talk.to/');
var responseFromPost = request.post('http://httpbin.org/post', { body: '<body/>' });

console.log(responseFromPost);
console.log("Reponse Body Length: ", responseFromPost.getBody().length);

console.dir('https://apache.org');
var errored = false;
try {
  // Test unauthorized HTTPS GET request
  var unAuthGetResponse = request.get('https://apache.org');
  console.log(unAuthGetResponse);
  console.log("Reponse Body: ", unAuthGetResponse.body.toString());
  errored = true;
} catch(ex) {
  console.log("Successully rejected unauthorized host: https://apache.org/");
}
if (errored)
  throw new Error('Should have rejected unauthorized https get request');


