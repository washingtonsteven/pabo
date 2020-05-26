import Being from "@base/Being";
import Travel from "../actions/Travel";
import Transfer from "../actions/Transfer";
import Jupiter from "../places/Jupiter";
import LesserRing from "../items/LesserRing";

const Jack = new Being("Jack", Jupiter, [Travel, Transfer], [LesserRing]);

export default Jack;
