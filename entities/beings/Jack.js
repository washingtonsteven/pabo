const Being = require("@base/Being");
const Travel = require("../actions/Travel");
const Transfer = require("../actions/Transfer");
const Jupiter = require("../places/Jupiter");
const LesserRing = require("../items/LesserRing");

const Jack = new Being("Jack", Jupiter, [Travel, Transfer], [LesserRing]);

module.exports = Jack;
