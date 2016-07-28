"use strict";
/* commands to remember:
// local testing
heroku local web

// to deploy to heroku
git push heroku master

// REST API testing
http-prompt localhost:8888
http-prompt https://afternoon-atoll-47323.herokuapp.com/
// change to URI; post with json body 
cd /api; post aaa=bbb
*/
var express = require("express");
var app = express();
var fs = require("fs");
var nJwt = require("njwt");
let options = {};
var signingKey = "Bi8KhyCM3yJhX74S35vWhdVUZGWUSKvqVbyQWcGr";

app.set("port", (process.env.PORT || 5000));
if (process.argv.length >= 3 && process.argv.indexOf("loadApiRouter") > -1) {
  console.log("loading API router");
  var apiRouter = require("./api_router")(options);
  app.use("/api", apiRouter); // apiRouter will be mounted under the URI /api
} else {
  console.log("serving only static files");
  // do nothing
}


app.use(express.static(__dirname + "/public")); // static assets
app.listen(app.get("port"), function() { // start
  console.log("API server running on port", app.get("port"));
});