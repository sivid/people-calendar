"use strict";
var moment = require("moment-timezone");

var jun = moment("2014-06-01T12:00:00Z");
var dec = moment("2014-12-01T12:00:00Z");

console.log(jun.tz("America/Los_Angeles").format("ha z"));  // 5am PDT
console.log(dec.tz("America/Los_Angeles").format("ha z"));  // 4am PST

console.log(jun.tz("America/New_York").format("ha z"));     // 8am EDT
console.log(dec.tz("America/New_York").format("ha z"));     // 7am EST

console.log(jun.tz("Asia/Tokyo").format("ha z"));           // 9pm JST
console.log(dec.tz("Asia/Tokyo").format("ha z"));           // 9pm JST

console.log(jun.tz("Australia/Sydney").format("ha z"));     // 10pm EST
console.log(dec.tz("Australia/Sydney").format("ha z"));     // 11pm EST

var x = new Date();
var currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60; // this will return -8 !!
console.log(x, currentTimeZoneOffsetInHours);

var dateobj1 = {
  year: 2016,
  month: 7,
  day: 29,
  hour: 8
};
let date1 = moment.tz(dateobj1, "Asia/Manila");
console.log("date1", date1.format());
date1.add(16, "hours");
console.log("date1", date1.format());

var dateobj2 = {
  year: 2016,
  month: 7,
  day: 30,
  hour: 0
};
let date2 = moment.tz(dateobj2, "Asia/Manila");
console.log("date2", date2.format());
console.log(date1.isSame(date2));

date1 = moment.tz(dateobj1, "Asia/Taipei");
console.log(date1.valueOf());
console.log(date2.valueOf());
console.log(moment(date1.valueOf()).format());
console.log(date1.format("z zz Z ZZ"));
console.log(date2.format("z zz Z ZZ"));
console.log(date1._z.name);

console.log("type tests start");
console.log(date1 instanceof moment); // true
console.log(date1 instanceof Number); // false
console.log(date1.unix() instanceof moment); // false
console.log(typeof date1.unix()); // "number"
console.log(date1.unix() instanceof Number); // false
console.log(typeof date1.unix() === "number"); // true
console.log(typeof 131423423 === "number"); // true
console.log(moment.tz.names());