import Entity from "./Entity";
import { EntityTypes } from "./std/constants";

class Place extends Entity {
  entityType: string = EntityTypes.PLACE;
  neighbors: Place[];

  constructor(name: string, neighbors?: Place[]) {
    super(name);

    this.neighbors = neighbors || [];
  }

  addNeighbor(place: Place): Place {
    const placeIndex = this.neighbors.findIndex((searchPlace) =>
      searchPlace.isEqual(place)
    );

    if (placeIndex < 0) this.neighbors.push(place);
    return this;
  }

  removeNeighbor(place: Place): Place {
    this.neighbors.filter((searchPlace) => !searchPlace.isEqual(place));
    return this;
  }
}

export = Place;
