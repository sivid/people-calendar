"use strict";
/* with bluebird */
var Promise = require("bluebird");
var redis = Promise.promisifyAll(require("redis"));
var client = redis.createClient();
var data = require("./data");

client.getAsync("string key").then(function(res) {
  console.log(res);
  client.quit();
});

console.log("data", data);

/* native */
// var redis = require("redis"), client = redis.createClient();

// client.on("error", function (err) {
//   console.log("Error " + err);
// });

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//   console.log(replies.length + " replies:");
//   replies.forEach(function (reply, i) {
//     console.log("    " + i + ": " + reply);
//   });
//   client.quit();
// });