require("module-alias/register");
const Runner = require("@base/runner");
const Illana = require("./entities/beings/Illana");
const Shopkeeper = require("./entities/beings/Shopkeeper");
const Jack = require("./entities/beings/Jack");
// Exports an array of all the places
const Map = require("./entities/places/_map");

(() => {
  // TODO: Remove Map from runner, since we only need to know about the current place (and its neighbors)
  const runner = new Runner([Illana, Shopkeeper, Jack].concat(Map), Map[0]);
  console.log(runner.summary());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.summary());
})();
