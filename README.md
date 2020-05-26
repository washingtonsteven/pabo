# PABO
_(yes I know that's a silly name)_

---

## Intro

PABO is a weird way to generate stories. It stands for Place, Action, Being, Object (turned Item cause it turns out "Object" is a reserved word like everywhere).

Place - A location. Has a name (string) and neighbors (other places, unidirectional) (NB: You can add neighbors in the constructor, but `require` loops might cause some issues, so using `addNeighbors` after the place has been instantiated would be safer.)

Action - A verb. Has a performer (Function) that takes in a source (Being) and target (Being, maybe an Object/Item) and modifies one or both of them. Can also modify the Runner (more on that later).

Being - A thing that can take actions. Usually people. Maybe animals. They have an inventory (Items) a place and a set of Actions. (Coming soon, custom attributes)

Object/Item - A thing. Going to call it "Item" form here on out. Just has a name.

Runner - The engine that ingests all these entities and does stuff to them. Basic loop for `step` is:
1. Establish our current place.
2. Find a person that is in this place that can do an action.
3. Have that person (source) perform a random action (with a random target if necessary)
4. The action performer function is called, and modifies the source and targets attributes (inventory, place, etc.)
5. Optionally, the action performer can update the runner itself (i.e. change the runner's current place)

---

## Install & Run

1. Clone the repo
2. `yarn install`
3. Install Typescript `yarn global add typescript`
4. `yarn example` to run the example script (also compiles Typescript form `base-src` to `base`)

---

## Sample Output

```
$> yarn start
yarn run v1.13.0
$ tsc
$ node index.js

----------------------------
We are currently in Stormhold
----------------------------
Illana is in Stormhold.
	They have nothing.
	They can do Move
Shopkeeper is in Stormhold.
	They have Ring of Power
	They can do Transfer
----------------------------
Jack is in Jupiter.
	They have Lesser Ring
	They can do Move,Transfer
----------------------------

Illana travelled to Felwinter
Illana travelled to Stormhold
Illana travelled to Felwinter
Illana travelled to Jupiter
Illana travelled to Felwinter
Illana travelled to Stormhold
Shopkeeper gave the Ring of Power to Illana
Illana gave the Ring of Power to Shopkeeper

----------------------------
We are currently in Stormhold
----------------------------
Illana is in Stormhold.
	They have nothing.
	They can do Move
Shopkeeper is in Stormhold.
	They have Ring of Power
	They can do Transfer
----------------------------
Jack is in Jupiter.
	They have Lesser Ring
	They can do Move,Transfer
----------------------------
```

---

## Basics

### `base-src`

Everything in `base-src` is the "guts" of Pabo. And it's all in Typescript. I'm just learning so please bear with me.

Entity is the superclass of everything. Everything here is an Entity.

Direct subclasses are Action, Being, Item, and Place. Being is the beefiest one.

`Runner` is the engine that ingests the entities and does stuff to them. Call `step()` to do a random thing. Inspect `currentState` for fun and call `summary()` to show where we are.

Added the `std` files for junk that you can call in your Entities if you like. Idk if I like calling it `std` but there you go.

### `entities`

So this is a list of entities I made up as an example of how to make your own. 

Places is weird cause we have to initialize the places before adding neighbors (don't be fooled by the Place constructor). We have to do it in this order because you'll get an empty neighbor list trying to add a neighbor that hasn't been initialized yet (i.e. a circular `require` loop -- e.g. Felwinter is neighbors with Stormhold is neighbors with Felwinter.) That's what `_map.js` is for, to set up those neighbor links. Pure convention, I don't think PABO will enforce mapping.

Also we're using `module-alias` so you can use `@base` in your `require`s to get to the entity base dir instead of `../..` or whatever.

### `index.js`

Creates a runner, fills it with entities, then calls `step` a bunch to get random results. You get a different series of events each time.

---

## Issues

- Uh. I'm not getting type hinting in the .js entities files (in VSCode). It would be nice to know what Entity functions I have available and method signatures and stuff. I thought that was the point of Typescript? 
  - I guess if I write entities in TS instead of plain JS I'll get them, but then I'll have to compile _those_. Is this really what life is like?
- This doesn't deal will with, like grammar, I don't think. Then again neither do I.

---

Thanks for reading! 😁
