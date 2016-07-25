"use strict";
var data = {};

var Person = function(firstName) {
  // this is the constructor
  this.firstName = firstName;
  console.log("Person instantiated");
  this.sayHello = function () {
    console.log("hello, I am " + this.firstName);
  };
};

var person1 = new Person("aperson");

var person2 = new Person("bperson");

person1.sayHello();
person2.sayHello();

module.exports = data;