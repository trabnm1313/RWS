import { forEach, random } from "lodash";
import Constants from "../../Constants";
import Entity from "../entities/index";
import _ from "lodash";

// import { loadStatus } from "./opendatabase"

let engine = null;
let state1 = null; // render state checker
let state2 = null; // render state checker

let monsterList = []; // player's team
let pocket = []; // player's item
let money = 0; // player's money

// state in shop
let itemInshop = []; // random item list
let wannaRandom = true; // first time must be true
let itemFullLenght = 4; // can be change
let monterFullLenght = 4; // can be change

// Item that gonna random appear in shop (MUST BE CHANGE)
const allItem = [
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

const price = {
  potion: 500,
  monster: 1000,
}; // price state

// Buy function
// return LEFT MONEY
function buyingItem(money, cost, status, entityList) {
  let doHave = null; // checking state
  let isFull = null; // checking state

  // Can't have the same item in pocket
  if (status.type == "Item") {
    doHave = pocket.map((element) => {
      if (element.item == status.item) {
        return true;
      } else return false;
    });

    // is the pocket full
    isFull = pocket.length == itemFullLenght ? true : false;
  } else if (status.type == "Monster") {
    // monster can be the same
    doHave = [false];
    // is the Team full
    isFull = monsterList.length == monterFullLenght ? true : false;
  }

  if (money < cost) {
    console.log("NOT ENOUGH MONEY");
    return { money: money, entity: entityList };
  } else if (doHave.includes(true)) {
    console.log("SAME");
    return { money: money, entity: entityList };
  } else if (isFull) {
    console.log("POCKET FULL");
    return { money: money, entity: entityList };
  } else {
    if (status.type == "Item") {
      entityList = entityList.filter((entity) => {
        return entity.status.id != status.id;
      });
      pocket.push(
        Entity.Item(
          engine,
          { x: 0, y: 0 },
          { width: 100, height: 60 },
          status,
          status.id.split(":")[0]
        )
      );
    } else if (status.type == "Monster") {
      entityList = entityList.filter((entity) => {
        return entity.status.id != status.id;
      });
      monsterList.push(
        Entity.Monster(
          engine,
          { x: 0, y: 0 },
          { width: 100, height: 60 },
          status,
          status.id.split(":")[0]
        )
      ); // FIND A WAY TO SEND STATUS
    }

    state1 = null;
    return { money: money - cost, entity: entityList };
  }
}

// random item in shop function
// NO RETURN
function randomItem() {
  while (itemInshop.length < 9) {
    itemInshop.push(allItem[random(0, allItem.length - 1)]);
  }
}

// renderer
export default function (entities, args) {
  const events = args.events;

  let entitiesList = Object.values(entities);
  if (engine == null) engine = entitiesList[0].engine;

  if (Constants.stage == "Shop") {
    // make it render just once time you want it run
    if (state1 === null) {
      // from player
      if (state2 === null) {
        monsterList = _.cloneDeep(Constants.team); // player's team
        pocket = _.cloneDeep(Constants.item); // player's item
        money = Constants.money;
      }
      state1 = "yes"; // checked state

      // the ramdom statement
      if (wannaRandom == true) {
        randomItem();
        wannaRandom = false;
      }

      // display item in shop
      if (state2 === null) {
        state2 = "yes";
        // position of shop item that displayed
        let counter = 0; // position in itemInshop array
        let xCounter = 230; // starter x
        let yCounter = 10; // starter y

        // loop row (for display item in shop)
        for (let i = 0; i < 3; i++) {
          xCounter = 230; // can be change
          yCounter += 65; // can be change

          // loop display item in shop
          for (let j = 0; j < 3; j++) {
            if (itemInshop[counter].type == "Item") {
              entitiesList.push(
                Entity.Item(
                  engine,
                  { x: xCounter, y: yCounter },
                  { width: 100, height: 60 },
                  null,
                  itemInshop[counter].value // MUST BE CHANGE
                )
              );
            } else if (itemInshop[counter].type == "Monster") {
              entitiesList.push(
                Entity.Monster(
                  engine,
                  { x: xCounter, y: yCounter },
                  { width: 100, height: 60 },
                  null,
                  itemInshop[counter].value // MUST BE CHANGE
                )
              );
            }

            xCounter += 110;
            counter++;
          }
        }
      }

      // display player's team
      monsterList.forEach((monster, index) => {
        if (index == 0) {
          monster.pos.x = 100; // Change Position
          monster.pos.y = 0;
          entitiesList.push(monster);
        } else if (index == 1) {
          monster.pos.x = 100; // Change Position
          monster.pos.y = 35;
          entitiesList.push(monster);
        } else if (index == 2) {
          monster.pos.x = 100; // Change Position
          monster.pos.y = 70;
          entitiesList.push(monster);
        } else if (index == 3) {
          monster.pos.x = 100; // Change Position
          monster.pos.y = 135;
          entitiesList.push(monster);
        }
      });

      // display player's item
      pocket.forEach((item, index) => {
        if (index == 0) {
          item.pos.x = 400; // Change Position
          item.pos.y = 0;
          entitiesList.push(item);
        } else if (index == 1) {
          item.pos.x = 500; // Change Position
          item.pos.y = 0;
          entitiesList.push(item);
        } else if (index == 2) {
          item.pos.x = 600; // Change Position
          item.pos.y = 0;
          entitiesList.push(item);
        } else if (index == 3) {
          item.pos.x = 700; // Change Position
          item.pos.y = 0;
          entitiesList.push(item);
        }
      });

      //
      entitiesList.push(
        Entity.Button(
          engine,
          { x: 100, y: 200 },
          { width: 100, height: 30 },
          null,
          "Confirm"
        )
      );
      //       entitiesList.push(Entity.CostIndicator(engine, {x: 0, y: 0}, {width: 100, height: 30}, null, "Hello"))
    }

    // Event Handler
    if (events.length > 0 && events[0].status != undefined) {
      let selected = events["0"].status;

      if (selected.type == "Item") {
        let inTeamAt = -1; // checking statement
        pocket.map((item, index) => {
          if (item.status.id.localeCompare(selected.id) == 0) {
            inTeamAt = index;
            return index;
          }
        }); // return index or undefined

        if (inTeamAt != -1) {
          pocket.splice(inTeamAt, 1);
          entitiesList = entitiesList.filter((entity) => {
            return entity.status.id != selected.id;
          });
          inTeamAt = -1;
          state1 = null; // re-render
        } else {
          if (selected.item === "HP_POTION") {
            let callback = buyingItem(
              money,
              price.potion,
              selected,
              entitiesList
            );
            money = callback.money;
            entitiesList = callback.entity;
          }
        }
      } else if (selected.type === "Monster") {
        let inTeamAt = -1; // checking statement
        monsterList.map((monster, index) => {
          if (monster.status.id.localeCompare(selected.id) == 0) {
            inTeamAt = index;
            return index;
          }
        }); // return index or undefined
        //!(inTeamAt.every((element) => element == -1))
        if (inTeamAt != -1) {
          monsterList.splice(inTeamAt, 1);
          money += 0.7 * price.monster; // selling monster give ur moneyback 70%
          entitiesList = entitiesList.filter((entity) => {
            return entity.status.id != selected.id;
          });
          inTeamAt = -1;
          state1 = null; // re-render
        } else {
          let callback = buyingItem(
            money,
            price.monster,
            selected,
            entitiesList
          );
          money = callback.money;
          entitiesList = callback.entity;
        }
      } else if (selected.type == "Button" && selected.button == "Confirm") {
        Constants.stage = "Battle";
        Constants.team = _.cloneDeep(monsterList);
        Constants.item = _.cloneDeep(pocket);
        state1 = null;
        state2 = null;
        return {};
      }
      console.log(money);
    }
  }

  entities = { ...entitiesList };

  return entities;
}
