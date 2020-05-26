const Being = require("@base/Being");
const Stormhold = require("../places/Stormhold");
const Travel = require("../actions/Travel");

const Illana = new Being("Illana", Stormhold, [Travel]);

module.exports = Illana;
