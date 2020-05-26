/**
 * Example for how to use PABO in Typescript
 */

import Runner from "@base/runner";
import Entity from "@base/Entity";
import Illana from "./entities/beings/Illana";
import Shopkeeper from "./entities/beings/Shopkeeper";
import Jack from "./entities/beings/Jack";
// An array of all places
import Map from "./entities/places/_map";

(() => {
  // TODO: Remove Map from runner, since we only need to know about the current place (and its neighbors)
  const worldObjects: Entity[] = [Illana, Shopkeeper, Jack, ...Map];
  const runner = new Runner(worldObjects, Map[0]);
  console.log(runner.summary());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.step());
  console.log(runner.summary());
  console.log(
    `---\nCheck out the source for this example in ./example/example.ts!\n---`
  );
})();
