'use strict';

var http = require('http'); // do not change this line

var server = http.createServer(function(req, res) {

  // home page
  if (req.url === '/missing') {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('your princess is in another castle');
      res.end();
  }

  else if (req.url === '/redirect') {
      res.writeHead(302, {Location: '/redirected'});
      res.end();
  }

  else if (req.url === '/redirected') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end();
  }

  else if (req.url === '/cache') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'max-age=86400'});
        res.write('cache this resource');
      res.end();
  }

  else if (req.url === '/cookie') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Set-Cookie': 'hello=world'});
        res.write('i gave you a cookie');
      res.end();
  }

  else if (req.url === '/check') {
      res.writeHead(200, {
        'Content-Type': 'text/plain',});

        let cookies = req.headers.cookie;

        if (cookies.indexOf('hello') == -1)
          res.write('no');
        else
          res.write('yes');
        res.end();
  }

});

console.log('server listening on port 8080');
server.listen(process.env.PORT||8080);


// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
