const Being = require("@base/Being");
const Stormhold = require("../places/Stormhold");
const RingOfPower = require("../items/RingOfPower");
const Transfer = require("../actions/Transfer");

const Shopkeeper = new Being(
  "Shopkeeper",
  Stormhold,
  [Transfer],
  [RingOfPower]
);

module.exports = Shopkeeper;
