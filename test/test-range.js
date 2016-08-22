let test = require("tape");
let Range = require("../Range");
let moment = require("moment-timezone");

// using native Javascript api for reference
// month is 0 based // wtf
let v1 = Date.UTC(2000, 0, 1); // Jan/01/2000 
let v2 = Date.UTC(2000, 1, 1); // Feb/01/2000
let v3 = Date.UTC(2000, 2, 1); // Mar/01/2000
let v4 = Date.UTC(2000, 3, 1); // Thu/01/2000

let r12 = new Range(v1, v2, "GMT");
// console.log("r12");
// r12.print();
let r13 = new Range(v1, v3, "GMT");
// console.log("r13");
// r13.print();
let r14 = new Range(v1, v4, "GMT");
let r23 = new Range(v2, v3, "GMT");
// console.log("r23");
// r23.print();
let r24 = new Range(v2, v4, "GMT");
let r34 = new Range(v3, v4, "GMT");

test("creation test", function(t) {
  t.plan(7);
  t.throws(function() {
    new Range(v1, v1, "GMT");
  }, "try to create instantaneous Range");
  t.throws(function() {
    new Range("sdfsdf", 423424, "GMT");
  }, "invalid startArg and endArg");
  t.throws(function() {
    new Range(v1, v2, "sdfsdfsdf");
  }, "invalid timezone string");
  let rtest13 = new Range(v1, v3, "GMT");
  let rtest31 = new Range(v3, v1, "GMT");
  t.equal(rtest13.valueOf() === rtest31.valueOf(), true);
  let m1 = moment(v1).tz("GMT");
  let m2 = moment(v2).tz("GMT");
  t.throws(function() {
    new Range(m1, m1, "GMT");
  }, "try to create instantaneous Range");
  t.equal(new Range(m1, m2, "GMT").valueOf() === r12.valueOf(), true);
  t.equal(new Range(m2, m1, "GMT").valueOf() === r12.valueOf(), true);

});

test("valueOf test", function(t) {
  t.plan(1);
  t.equal(r12.valueOf() === (v1 + "-" + v2), true);
});

test("overlap test", function(t) {
  t.plan(8);
  t.equal(r12.isTouching(r23), true, "r12 touches/overlaps r23");
  t.equal(r23.isTouching(r12), true, "r23 touches/overlaps r12");
  t.equal(r12.isTouching(r13), true, "r12 touches/overlaps r13");
  t.equal(r13.isTouching(r12), true, "r13 touches/overlaps r12");
  t.equal(r23.isTouching(r13), true, "r23 touches/overlaps r13");
  t.equal(r13.isTouching(r23), true, "r13 touches/overlaps r23");
  t.equal(r12.isTouching(r34), false, "r12 does not touch/overlap r34");
  t.equal(r34.isTouching(r12), false, "r34 does not touch/overlap r12");
});

// console.log("13 union",r1.union(r2).valueOf());
test("Range union test", function(t) {
  t.plan(8);
  t.throws(function() {
    r34.union("yoo");
  }, "tried to UNION with non Range obj");
  t.equal(r12.union(r23).valueOf(), r13.valueOf(), "Jan to Feb UNION WITH Feb to Mar");
  t.equal(r23.union(r12).valueOf(), r13.valueOf(), "Feb to Mar UNION WITH Jan to Feb");
  t.throws(function() {
    r12.union(r34);
  }, "tried to UNION non-overlapping Range obj");
  t.equal(r12.union(r13).valueOf(), r13.valueOf(), "Jan to Feb UNION WITH Jan to Mar");
  t.equal(r13.union(r12).valueOf(), r13.valueOf(), "Jan to Mar UNION WITH Jan to Feb");
  t.equal(r13.union(r24).valueOf(), r14.valueOf(), "Jan to Mar UNION WITH Feb to Apr");
  t.equal(r24.union(r13).valueOf(), r14.valueOf(), "Feb to Apr UNION WITH Jan to Mar");
});