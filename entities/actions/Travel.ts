import Action from "@base/Action";
import pick from "@base/std/utils/pick";

const Travel = new Action(
  "Move",
  (traveller) => {
    const currentPlace = traveller.place;
    const targetPlace = pick(currentPlace.neighbors);

    if (!targetPlace) {
      return { message: `There's nowhere for ${traveller.name} to move to.` };
    }

    traveller.setPlace(targetPlace);

    return {
      message: `${traveller.name} travelled to ${targetPlace.name}`,
      runnerUpdate: (runner) => runner.setPlace(targetPlace),
    };
  },
  false
);

export default Travel;
