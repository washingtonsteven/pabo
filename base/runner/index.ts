import { EntityTypes } from "../std/constants";
import pick from "../std/utils/pick";
import Entity from "../Entity";
import Place from "../Place";
import Being from "../Being";
import Item from "../Item";
import Action from "../Action";

interface State {
  [EntityTypes.PLACE]?: Place;
  [EntityTypes.BEING]?: Being[] | null;
  [EntityTypes.ITEM]?: Item[] | null;
  currentPlace?: Place;
}

const compose = (entities: Entity[], initialPlace?: Place): State => {
  return entities.reduce((currentState: State, entity: Entity): State => {
    const updatedState = { ...currentState };
    const currentType = entity.entityType;

    if (!updatedState[currentType]) updatedState[currentType] = [];
    updatedState[currentType].push(entity);

    if (entity instanceof Place) {
      // Set currentPlace to the initialPlace passed in
      if (initialPlace && entity.isEqual(initialPlace)) {
        updatedState.currentPlace = entity as Place;
      }

      // If no initial place was passed in, set it to the first place we find
      if (!initialPlace && !updatedState.currentPlace) {
        updatedState.currentPlace = entity as Place;
      }
    }

    return updatedState;
  }, {});
};

class Runner {
  startState: State;
  currentState: State;

  constructor(initialEntities: Entity[], initialPlace?: Place) {
    this.startState = this.currentState = compose(
      initialEntities,
      initialPlace
    );
  }

  getBeings(exclude?: Being[]) {
    let beings = this.currentState[EntityTypes.BEING];

    // Only want the beings that are here
    beings = beings.filter((being) =>
      being.place.isEqual(this.currentState.currentPlace)
    );

    // Take out some beings we don't like >:(
    if (exclude) {
      exclude.forEach((excludedBeing) => {
        beings = beings.filter((being) => !being.isEqual(excludedBeing));
      });
    }
    return beings;
  }

  getActionableBeings() {
    const beings = this.getBeings();
    if (!beings) return null;

    return beings.filter((being) =>
      Boolean(being.getActions() && being.getActions().length)
    );
  }

  getOutsideBeings() {
    let beings = this.currentState[EntityTypes.BEING];

    beings = beings.filter(
      (being) => !being.place.isEqual(this.currentState.currentPlace)
    );

    return beings;
  }

  setPlace(place: Place) {
    if (place.isEqual(this.currentState.currentPlace)) return;

    this.currentState.currentPlace = place;
  }

  step() {
    const actionableBeings = this.getActionableBeings();
    if (!actionableBeings) return null;

    const actor: Being = pick(actionableBeings);
    const action: Action = pick(actor.getActions());
    let target: Being | null = null;
    if (action.requiresTarget) {
      target = pick(this.getBeings([actor]));

      if (!target) {
        return `${actor.name} tried to ${action.name}, but couldn't find a suitable target`;
      }
    }

    const actionResult = actor.doAction(action, target);

    if (actionResult.runnerUpdate) {
      actionResult.runnerUpdate(this);
    }

    return actionResult.message;
  }

  summarizeBeing(being) {
    let beingString = "";
    beingString += `${being.name} is in ${being.place.name}.\n\t`;
    beingString += being.hasInventory()
      ? `They have ${being.inventoryList()}`
      : `They have nothing. `;
    beingString += "\n\t";
    beingString += being.hasActions()
      ? `They can do ${being.actionList()} `
      : `They can't do anything. `;

    return beingString;
  }

  summary() {
    let result = "";

    // Current Place
    const placeAnnounce = `We are currently in ${this.currentState.currentPlace.name}`;
    const placeAnnounceSep = new Array(placeAnnounce.length - 1)
      .fill("-")
      .join("");
    result += `\n${placeAnnounceSep}\n${placeAnnounce}\n${placeAnnounceSep}\n`;

    // Being state. Name, Inventory, Actions
    const beings = this.getBeings();
    result += beings.map(this.summarizeBeing).join("\n");
    result += `\n${placeAnnounceSep}\n`;

    // Beings not in the current place
    const otherBeings = this.getOutsideBeings();
    if (otherBeings && otherBeings.length) {
      result += otherBeings.map(this.summarizeBeing).join("\n");
      result += `\n${placeAnnounceSep}\n`;
    }

    return result;
  }
}

export = Runner;
