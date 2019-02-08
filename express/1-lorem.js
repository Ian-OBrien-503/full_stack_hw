'use strict';

var express = require('express'); // do not change this line
const server = express()

server.get('/lorem',function(req,res){
  res.status(200);
  res.send("<!DOCTYPE html><html><body>lorem ipsum</body></html>");
  res.end()
})

server.listen(process.env.PORT||8080);

// http://localhost:8080/lorem should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html
