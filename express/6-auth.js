'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http').BasicStrategy; // do not change this line
var server = express()

passport.use(new strategy(
  function(userid, password, done) {
    User.findOne({ username: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }
));

server.get('/hello',
  function(req,res){
  res.status(200);
  res.type("text/plain");
  res.send('accessible to everyone');
  res.end();
})

server.get('/*',
passport.authenticate('basic', { session: false }),
  function(req, res) {

  });

server.listen(process.env.PORT||8080);
// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password
