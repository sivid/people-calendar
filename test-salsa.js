"use strict";
/**
 * @constructor
 * @param {string} name aasfsf
 * @param {number} age asdfsjdfksk
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function greet() {
  console.log("hello I am " + this.name);
};
var p = new Person("nn", 12312);
p.greet();