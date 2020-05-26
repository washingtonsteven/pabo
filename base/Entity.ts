import { EntityTypes, DEFAULT_ENTITY_NAME } from "./std/constants";

class Entity {
  entityType: string = EntityTypes.ENTITY;
  name: string = DEFAULT_ENTITY_NAME;

  constructor(name: string) {
    this.name = name;
  }

  isEqual(other: Entity) {
    return this.name === other.name;
  }
}

export = Entity;
