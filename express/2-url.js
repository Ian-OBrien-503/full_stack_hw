'use strict';

var express = require('express'); // do not change this line
const server = express()

server.get('/',function(req,res){
  res.status(200);
  res.type("text/plain");
  res.send("you have accessed the root");
  res.end();
})

server.get('/test/:parameter',function(req,res){
  res.status(200);
  var test = req.params.parameter;
  res.type("text/plain");
  res.send("you have accessed \""+ test +"\"\ within test");
  res.end();
})

server.get('/attributes',function(req,res){
  res.status(200);
  var test = req.query;
  res.type("text/html");
  res.send(" <!DOCTYPE html><html><body><table border="1"> ");

  for(let key in test ){
  res.send(" <tr><td> " + key + " </td><td> " + test[key] + " </td></tr> ");
        }

  res.send(" </table><body></html> ");
  res.end();
})

server.listen(process.env.PORT||8080);


// req.params
// req.query
// req.body



// http://localhost:8080/ should return 'you have accessed the root' in plain text

// http://localhost:8080/test/hello should return 'you have accessed "hello" within test' in plain text

// http://localhost:8080/test/world should return 'you have accessed "world" within test' in plain text

// http://localhost:8080/attributes?hello=world&lorem=ipsum should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>hello</td><td>world</td></tr>
//         <tr><td>lorem</td><td>ipsum</td></tr>
//       </table>
//     </body>
//   </html>

// http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//   <!DOCTYPE html>
//   <html>
//     <body>
//       <table border="1">
//         <tr><td>first</td><td>1</td></tr>
//         <tr><td>second</td><td>2</td></tr>
//         <tr><td>third</td><td>3</td></tr>
//       </table>
//     </body>
//   </html>
