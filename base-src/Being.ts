import Entity from "./Entity";
import { EntityTypes } from "./std/constants";
import Item from "./Item";
import Action from "./Action";
import ActionResult from "./ActionResult";
import Place from "./Place";

class Being extends Entity {
  inventory: Item[];
  actions: Action[];
  place: Place;

  entityType: string = EntityTypes.BEING;

  constructor(
    name: string,
    place: Place,
    actions?: Action[],
    inventory?: Item[]
  ) {
    super(name);
    this.place = place;
    this.actions = actions || [];
    this.inventory = inventory || [];
  }

  addToInventory(items: Item[] | Item): Being {
    if (!Array.isArray(items)) {
      items = [items];
    }

    this.inventory = this.inventory.concat(items);
    return this;
  }

  removeFromInventory(items: Item[] | Item): Being {
    if (!Array.isArray(items)) {
      items = [items];
    }

    items.forEach((itemToBeRemoved) => {
      this.inventory = this.inventory.filter(
        (searchItem) => !itemToBeRemoved.isEqual(searchItem)
      );
    });
    return this;
  }

  setInventory(items: Item[] | Item): Being {
    this.inventory = [];
    return this.addToInventory(items);
  }

  getInventory(): Item[] | null {
    return this.inventory;
  }

  hasInventory(): Boolean {
    return Boolean(this.inventory && this.inventory.length);
  }

  inventoryList(): string {
    return this.getInventory()
      .map((item) => item.name)
      .join(",");
  }

  doAction(action: Action, target: Entity | null): ActionResult {
    const actionIndex = this.actions.findIndex((searchAction) =>
      action.isEqual(searchAction)
    );
    if (actionIndex >= 0) return action.perform(this, target);

    return {
      message: `Tried to perform ${action.name || "an unknown action"}, but ${
        this.name
      } can't do that!`,
    };
  }

  getActions(): Action[] | null {
    return this.actions;
  }

  actionList(): string {
    return this.getActions()
      .map((a) => a.name)
      .join(",");
  }

  addAction(action: Action): Being {
    this.actions.push(action);
    return this;
  }

  removeAction(action: Action): Being {
    this.actions = this.actions.filter(
      (searchAction) => !action.isEqual(searchAction)
    );

    return this;
  }

  hasAction(action: Action): Boolean {
    return (
      this.actions.findIndex((searchAction) => action.isEqual(searchAction)) >=
      0
    );
  }

  hasActions(): Boolean {
    return Boolean(this.actions && this.actions.length);
  }

  setPlace(place: Place): Being {
    this.place = place;
    return this;
  }
}

export = Being;
