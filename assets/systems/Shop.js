import { random } from "lodash";
import Constants from "../../Constants";
import Entity from "../entities/index";
// import { loadStatus } from "./opendatabase"

let engine = null;
let state1 = null;
let pocket = [];
let itemInshop = [];
let money = 100;

let allItem = [
  {
    type: "Monster",
    value: "Bat",
  },
  {
    type: "Monster",
    value: "Ghost",
  },
  {
    type: "Monster",
    value: "Goblin",
  },
  {
    type: "Item",
    value: "HP_POTION",
  },
];

function randomItem() {
  while (itemInshop.length < 9) {
    itemInshop.push(allItem[random(0, allItem.length - 1)]);
  }
}

function buy(item) {
  pocket.push(item);
  console.log("Buy");
  console.log(pocket);
}

export default function (entities, args) {
  const events = args.events;

  let entitiesList = Object.values(entities);
  if (engine == null) engine = entitiesList[0].engine;

  if (state1 === null) {
    state1 = "yes";
    randomItem();

    let counter = 0;
    let xCounter = 230;
    let yCounter = 10;

    for (let i = 0; i < 3; i++) {
        xCounter = 230
        yCounter += 65

        for (let j = 0; j < 3; j++) {
            if (itemInshop[counter].type == "Item") {
                entitiesList.push(Entity.Item(engine, {x: xCounter, y: yCounter}, {width: 100, height: 60}, null, itemInshop[counter].value))
            } else if (itemInshop[counter].type == "Monster") {
                entitiesList.push(Entity.Monster(engine, {x: xCounter, y: yCounter}, {width: 100, height: 60}, null, itemInshop[counter].value))
            }

            xCounter += 110
            counter++
        }
    }

    // entitiesList.push(Entity.Item(engine, {x: 230, y: 10}, {width: 100, height: 60}, null, itemInshop[0]))
    // entitiesList.push(Entity.Monster(engine, {x: 340, y: 10}, {width: 100, height: 60}, null, itemInshop[1]))
    // entitiesList.push(Entity.HP_Potion(engine, {x: 450, y: 10}, {width: 100, height: 60}, null))
    // entitiesList.push(Entity.HP_Potion(engine, {x: 230, y: 75}, {width: 100, height: 60}, null))
    // entitiesList.push(Entity.HP_Potion(engine, {x: 340, y: 75}, {width: 100, height: 60}, null))
    // entitiesList.push(Entity.HP_Potion(engine, {x: 450, y: 75}, {width: 100, height: 60}, null))
    // entitiesList.push(Entity.HP_Potion(engine, {x: 230, y: 140}, {width: 100, height: 60}, null))
    // entitiesList.push(Entity.HP_Potion(engine, {x: 340, y: 140}, {width: 100, height: 60}, null))
    // entitiesList.push(Entity.HP_Potion(engine, {x: 450, y: 140}, {width: 100, height: 60}, null))
  }

  if (events.length > 0 && events[0].status != undefined) {
    if (events["0"].status.type == "Potions") {
      // buy(events["0"].id)
      // buy()
    }
  }

  entities = { ...entitiesList };

  return entities;
}
