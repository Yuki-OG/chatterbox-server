var requestHandler = function(request, response) {

  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, authorization',
    'access-control-max-age': 10 // Seconds.
  };

  var noggins = defaultCorsHeaders;
  noggins['Content-Type'] = 'application/json';

  let { addMessage, messages } = require('./Messages.js');

  var statusCode = 200;
  const { headers, method, url } = request;

  console.log('Serving request type ' + method + ' for url ' + url);

  request.on('error', (err) => {
    console.error(err);
    statusCode = 400;
    response.end();
  });

  if (method === 'OPTIONS') {
    response.writeHead(statusCode, noggins);
    response.end();
  }

  if (method === 'GET') {
    if (url === '/classes/messages') {
      response.writeHead(statusCode, noggins);
      response.end(JSON.stringify(messages));
    } else {
      statusCode = 404;
      response.writeHead(statusCode, noggins);
      response.end();
    }
  }

  if (method === 'POST') {
    request.on('data', (chunk) => {
      if ('/classes/messages' === url) {
        addMessage(chunk.toString());
        statusCode = 201;
      } else {
        statusCode = 404;
      }
    }).on('end', () => {
      response.writeHead(statusCode, noggins);
      response.end(JSON.stringify(messages));
    });
  }

};

module.exports.requestHandler = requestHandler;