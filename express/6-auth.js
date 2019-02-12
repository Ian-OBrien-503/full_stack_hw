'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line
var server = express()

passport.use(new strategy.BasicStrategy(
  function(userid, password, done) {
      if (userid != 'test')
        return done(null,false);
      if(password != 'logmein')
        return done(null,false);
      return done(null,userid);
  }));

  server.use(passport.initialize());
  server.use(passport.session());

server.get('/hello', function(req,res){
  res.status(200);
  res.type("text/plain");
  res.send('accessible to everyone');
  res.end();
});

server.use(passport.authenticate('basic',{session: false}));
  server.get('/world', function(req, res) {
  res.status(200);
  res.type("text/plain");
  res.write('only accessible when logged in');
  res.end();
  });

server.use(passport.authenticate('basic',{session: false}));
server.get('/test', function(req, res) {
    res.status(200);
    res.type("text/plain");
    res.send('only accessible when logged in');
    res.end();
    });

server.listen(process.env.PORT||8080);
// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password
