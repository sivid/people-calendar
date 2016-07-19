// nodemon index.js
// http-prompt localhost:8888
// cd /api; post bodydata=dat
// https://www.npmjs.com/package/body-parser
var express = require("express");
var app = express();
var fs = require('fs');
var bodyParser = require("body-parser");
var nJwt = require('njwt');
var responseTime = require('response-time')

var port = process.env.port || 5000;
var api_router = express.Router();
var signingKey = 'Bi8KhyCM3yJhX74S35vWhdVUZGWUSKvqVbyQWcGr';

// middleware needs to be registered before routers
api_router.use(function(req, res, next) { // do logging
  console.log("a request came in at " + req.method + " " + req.originalUrl);
  next();
});
api_router.use(bodyParser.json());
app.use(responseTime()); // adds X-Response-Time to response header

api_router.route("/")
  .get(function(req, res) {
    res.json({message: "hej!"});
  })
  .post(function(req, res) {
    console.log(req.body);
    reply = {};
    reply.msg = "POST hej!";
    res.json(JSON.stringify(reply));
  });
app.use("/api", api_router); // api_router will be mounted under the URI /api

// static assets
app.use(express.static(__dirname + '/public'));





// start
app.listen(port, function() {
  console.log("API server running on port", port);
});