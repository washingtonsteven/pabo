/**
 * Example for how to use PABO is basic Javascript
 *
 * Run "tsc" (after yarn add global typescript) to generate type files and get IDE hinting
 */
const Runner = require("../dist/base/runner");
const Being = require("../dist/base/Being");
const Place = require("../dist/base/Place");

const TheOffice = new Place("The Office");
const Jim = new Being("Jim", TheOffice);

const runner = new Runner([Jim, TheOffice], TheOffice);

console.log(runner.summary());
