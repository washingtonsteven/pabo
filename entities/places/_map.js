const Stormhold = require("./Stormhold");
const Felwinter = require("./Felwinter");
const Jupiter = require("./Jupiter");

Stormhold.addNeighbor(Felwinter);
Felwinter.addNeighbor(Stormhold);
Felwinter.addNeighbor(Jupiter);
Jupiter.addNeighbor(Stormhold);
Jupiter.addNeighbor(Felwinter);

module.exports = [Stormhold, Felwinter, Jupiter];
