import Entity from "./Entity";
import Being from "./Being";
import ActionResult from "./ActionResult";
import { EntityTypes } from "./std/constants";

interface PerformerFunction {
  (
    source: Being,
    target: Entity | null,
    thisAction: Action,
    additional?: any
  ): ActionResult;
}

class Action extends Entity {
  entityType: string = EntityTypes.ACTION;
  performer: PerformerFunction;
  requiresTarget: boolean = false;

  constructor(
    name: string,
    performer: PerformerFunction,
    requiresTarget?: boolean
  ) {
    super(name);

    this.performer = performer;
    this.requiresTarget = Boolean(requiresTarget);
  }

  perform(source: Being, target?: Entity): ActionResult {
    if (this.performer) {
      return this.performer(source, target, this);
    }
    return {
      message: `Action (${this.name || "unknown name"}) failed.`,
    };
  }
}

export = Action;
