var express = require("express");
var bodyParser = require("body-parser");
var router = module.exports = express.Router();
var responseTime = require("response-time");
var Promise = require("bluebird");
var redis = Promise.promisifyAll(require("redis"));
var redisClient = redis.createClient(process.env.REDIS_URL);

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

router.post("/redistest", function (req, res) {
  redisClient.setAsync("keyhere", "valhere", redis.print).then(function (result) {
    console.log("what result?", result);
    redisClient.getAsync("keyhere").then(function (res) {
      console.log(res);
      // redisClient.quit();
      var reply = {};
      reply.val = res;
      res.json(JSON.stringify(reply));
    });
  });

});