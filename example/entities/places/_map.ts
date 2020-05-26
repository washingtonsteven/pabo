import Stormhold from "./Stormhold";
import Felwinter from "./Felwinter";
import Jupiter from "./Jupiter";

Stormhold.addNeighbor(Felwinter);
Felwinter.addNeighbor(Stormhold);
Felwinter.addNeighbor(Jupiter);
Jupiter.addNeighbor(Stormhold);
Jupiter.addNeighbor(Felwinter);

export default [Stormhold, Felwinter, Jupiter];
