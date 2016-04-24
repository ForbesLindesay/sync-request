var request = require('../');

// Test GET helper request
console.log('GET using helper method', 'http://localhost:3030/internal-test');
var responseFromGet = request.get('http://localhost:3030/internal-test', {timeout: 2000});

console.log(responseFromGet);
console.log("Reponse Body Length from GET helper: ", responseFromGet.getBody().length);

// Test HTTPS POST request
console.log('POST', 'http://localhost:3030/internal-test');
var responseFromPost = request.post('http://localhost:3030/internal-test', {timeout: 2000, body: '<body/>' });

console.log(responseFromPost);
console.log("Reponse Body Length: ", responseFromPost.getBody().length);

// Test PUT request
console.log('PUT', 'http://localhost:3030/internal-test');
var responseFromPut = request.put('http://localhost:3030/internal-test', {timeout: 2000, body: '<body/>' });

console.log(responseFromPut);
console.log("Reponse Body Length: ", responseFromPut.getBody().length);

// Test HTTPS DELETE request
console.log('DELETE', 'http://localhost:3030/internal-test');
var responseFromDelete = request.delete('http://localhost:3030/internal-test', {timeout: 2000});

console.log(responseFromDelete);
console.log("Reponse Body Length: ", responseFromDelete.getBody().length);

