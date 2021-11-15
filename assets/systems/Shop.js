import { random } from "lodash";
import Constants from "../../Constants";
import Entity from "../entities/index";
// import { loadStatus } from "./opendatabase"

let engine = null;
let state1 = null;

let pocket = [];
let monsterList = [];
let itemInshop = [];
let money = 1000;
let wannaRandom = true;

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

function buyingItem(money, cost, item) {
  let doHave = null;
  let isFull = null;
  if (item.type == "Item") {
    doHave = pocket.map((element) => {
      if (element.item == item.item) {
        return true;
      } else return false;
    });

    isFull = pocket.length == 4 ? true : false
  } else if (item.type == "Monster") {
    doHave = [false]
    isFull = monsterList.length == 6 ? true : false
  }

  if (money < cost) {
    console.log("NOT ENOUGH MONEY");
    return 0;
  } else if (doHave.includes(true)) {
    console.log("SAME");
    return 0;
  } else if (isFull) {
    console.log("POCKET FULL");
    return 0;
  } else {
    pocket.push(item);
    return money - cost;
  }
}

function randomItem() {
  while (itemInshop.length < 9) {
    itemInshop.push(allItem[random(0, allItem.length - 1)]);
  }
}

export default function (entities, args) {
  const events = args.events;

  let entitiesList = Object.values(entities);
  if (engine == null) engine = entitiesList[0].engine;

  if (state1 === null) {
    console.log("rendered");
    state1 = "yes";

    if (wannaRandom == true) {
      console.log("random");
      randomItem();
      wannaRandom = false;
    }

    let counter = 0;
    let xCounter = 230;
    let yCounter = 10;

    for (let i = 0; i < 3; i++) {
      xCounter = 230;
      yCounter += 65;

      for (let j = 0; j < 3; j++) {
        if (itemInshop[counter].type == "Item") {
          entitiesList.push(
            Entity.Item(
              engine,
              { x: xCounter, y: yCounter },
              { width: 100, height: 60 },
              null,
              itemInshop[counter].value
            )
          );
        } else if (itemInshop[counter].type == "Monster") {
          entitiesList.push(
            Entity.Monster(
              engine,
              { x: xCounter, y: yCounter },
              { width: 100, height: 60 },
              null,
              itemInshop[counter].value
            )
          );
        }

        xCounter += 110;
        counter++;
      }
    }
  }

  // Event Handler
  if (events.length > 0 && events[0].status != undefined) {
    let selected = events["0"].status;

    if (selected.type == "Item") {
      if (selected.item === "HP_POTION") {
        money = buyingItem(money, 510, selected);
        console.log(money);
      }
    } else if (selected.type === "Monster") {
      money = buyingItem(money, 990, selected);
      console.log(money);
    }
  }

  entities = { ...entitiesList };

  return entities;
}
