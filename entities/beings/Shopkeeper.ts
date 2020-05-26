import Being from "@base/Being";
import Stormhold from "../places/Stormhold";
import RingOfPower from "../items/RingOfPower";
import Transfer from "../actions/Transfer";

const Shopkeeper = new Being(
  "Shopkeeper",
  Stormhold,
  [Transfer],
  [RingOfPower]
);

export default Shopkeeper;
