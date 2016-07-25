"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var router = module.exports = express.Router();
var responseTime = require("response-time");
var Promise = require("bluebird");
var redis = Promise.promisifyAll(require("redis"));
var redisClient = redis.createClient(process.env.REDIS_URL); // will connect to local redis if not set

router.use(responseTime()); // adds X-Response-Time to response header

router.use(function (req, res, next) { // do logging
  console.log("a request came in at " + req.method + " " + req.originalUrl);
  next();
});
router.use(bodyParser.json());

router.route("/")
  .get(function (req, res) {
    res.json({ message: "hej!" });
  })
  .post(function (req, res) {
    console.log(req.body);
    var reply = {};
    reply.msg = "POST hej!";
    reply.yousent = req.body;
    res.json(JSON.stringify(reply));
  });

router.post("/posthere", function (req, res) {
  console.log("/api/posthere");
  var reply = {};
  reply.msg = "Heil!";
  res.json(JSON.stringify(reply));
});

function redistest(key, value, response) {
  // remember the whole point of Promise is to allow async programming do `return` and `throw`, and to have a call stack
  // https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
  console.log("redistest - START, incoming key and value:", key, value);
  redisClient.setAsync(key, value).then(function (result) {
    console.log("this should say OK", result);
  }).then(function (result) {
    console.log("this should be undefined:", result);
    return redisClient.getAsync(key).then(function (val) { // note why we put this function call here
      console.log("retrieved value was", val);
      if (val !== value) throw "not equal!";
      var reply = {};
      reply.val = val;
      // know
      // 1. why we need to return here
      // 2. what are we returning here
      // 3. what will our next handler receive
      // 4. where are we going next
      return reply; 
    });
  }).then(function (reply) {
    response.json(JSON.stringify(reply));
  }).catch(function (err) {
    console.error("redistest oops", err);
  });
}

router.get("/redistest_query", function (request, response) {
  redistest(request.query.key, request.query.value, response);
});
router.post("/redistest_params/:key/:value", function (request, response) {
  redistest(request.params.key, request.params.value, response);
});




