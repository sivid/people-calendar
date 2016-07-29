
var x = new Date();
var currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60; // this will return -8 for Taiwan!!
console.log(x, currentTimeZoneOffsetInHours);
console.log(moment.tz.guess());