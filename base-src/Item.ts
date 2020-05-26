import Entity from "./Entity";
import { EntityTypes } from "./std/constants";

class Item extends Entity {
  entityType: string = EntityTypes.ITEM;
}

export = Item;
