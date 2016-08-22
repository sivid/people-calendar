"use strict";
let Range = require("range");

/**
 * constructor
 */
function Rangelist(r1) {
  if (r1 instanceof Range) {
    throw new Error("must use Range to initialize");
  }
  this.thisList = [];
}

/**
 * Add a Range into list.
 * If the new Range object touch/overlap with one or more existing Range(s), they should be merged.
 * If the new Range object does not touch/overlap with any existing Range(s), it should be inserted.
 * The list should be kept sorted by the .start of each Range.
 */
Rangelist.prototype.add = function(thatRange) {
  // check which elements does thatRange overlap with
  let overlapIdxList = [];
  for (let i=0; i<this.thisList.length; i++) {
    // TODO
  }
  // merge all involved Ranges

  // remove all involved Ranges

  // insert new Range into proper place

};

/**
 * remove a Range from list
 */


/**
 * return this list in a machine readable form
 */

/**
 * return this list in a human readable form
 */