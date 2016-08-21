"use strict";
var moment = require("moment-timezone");

function Range(startArg, endArg, tzString) {
  if (typeof tzString !== "string") {
    throw new Error("third argument must be a timezone string"); // like "Asia/Taipei"
  }
  if (moment.tz.names().indexOf(tzString) === -1) {
    throw new Error("third argument must be a timezone string"); // like "Asia/Taipei"
  }
  if (typeof startArg === "number" && typeof endArg === "number") { // using unix timestamp
    if (startArg === endArg) {
      throw new Error("cannot have a instantaneous range"); // TODO rly?
    }
    let s = startArg > endArg ? endArg : startArg;
    let e = startArg < endArg ? endArg : startArg;
    this.start = moment(s).tz(tzString);
    this.end = moment(e).tz(tzString);
    this.tzString = tzString;
  } else if (startArg instanceof moment && endArg instanceof moment) {
    if (startArg.format("ZZ") !== endArg.format("ZZ")) {
      // I don't care if their z or zz or ._z.name matches or not.
      // Actually, do nothing, I don't think this condition will cause an error,
      // the respective Moment objects will just live on.
      // Should note that our tzString is not representative of both Moment objects from now on.
      // tzString is only used when we are creating new start/end Moment objects from scratch.
      // Should not matter.  I think.

      // ok, after thinking a bit, it does matter.  If only for consistency.
      throw new Error("input timezone offsets don't match @@");
    }
    if (startArg.isBefore(endArg)) {
      this.start = startArg;
      this.end = endArg;
    } else if (startArg.isAfter(endArg)) {
      this.start = endArg;
      this.end = startArg;
    } else {
      throw new Error("cannot have a instantaneous range"); // TODO rly?
    }
    this.tzString = startArg._z.name; // this isn't in official documents
  } else {
    console.error(startArg, endArg, tzString);
    throw new Error("invalid argument");
  }
}

Range.prototype.print = function () {
  console.log("starts at", this.start.format());
  console.log("ends at", this.end.format());
};

Range.prototype.valueOf = function () {
  return this.start.valueOf() + "-" + this.end.valueOf();
};

Range.prototype.isOverlap = function (that) {
  if (!(that instanceof Range)) {
    throw new Error("need to compare instances of Range");
  }
  if (that.start.isBefore(this.end) && that.end.isAfter(this.start)) {
    return true;
  } else {
    return false;
  }
};

Range.prototype.union = function (that) {
  if (!(that instanceof Range)) {
    throw new Error("need to compare instances of Range");
  }
  if (!this.isOverlap(that)) {
    // they don't overlap, but it's possible that their edges touch
    if (this.end.isSame(that.start)) {
      return new Range(this.start, that.end, this.tzString);
    } else if (this.start.isSame(that.end)) {
      return new Range(that.start, this.end, this.tzString);
    } else {
      throw new Error(this.format() + " and " + that.format() + " do not union to a valid Range");
    }
  } else { // they overlap
    if (this.start.isSameOrBefore(that.start) && this.end.isSameOrAfter(that.end)) {
      return this; // this completely envelops that
    } else if (that.start.isSameOrBefore(this.start) && that.end.isSameOrAfter(this.end)) {
      return that; // that completely envelops this
    } else if (this.start.isBefore(that.start) && this.end.isBefore(that.end)) {
      return new Range(this.start, that.end, this.tzString); // this starts before that and ends before that
    } else if (that.start.isBefore(this.start) && that.end.isBefore(this.end)) {
      return new Range(that.start, this.end, this.tzString); // that starts before this and ends before this
    } else {
      throw new Error("I've missed a case @@", this.format(), that.format());
    }
  }
};
module.exports = Range;