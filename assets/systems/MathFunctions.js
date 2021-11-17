import _ from 'lodash'
import entities from '../entities';

let initialStat; // backup data
let nowStat = []

function DamageCalculator(attackerATK, TargetDEF) {
  return attackerATK - attackerATK * (TargetDEF / 100);
}

function getNowStat(BaseStat, Level) {
  BaseStat.Health *= Level
  BaseStat.Attack *= Level
  BaseStat.Defense *= Level

  return BaseStat
}

function MoneyDrops(wordLength, MoneyLevel = 1) {
  let money = 0;

  wordLength.map((wordLength) => {
    switch (wordLength) {
      case 1:
        money += 10 * MoneyLevel;
        break;
      case 2:
        money += 50 * MoneyLevel;
        break;
      case 3:
        money += 100 * MoneyLevel;
        break;
      case 4:
        money += 200 * MoneyLevel;
        break;
      case 5:
        money += 400 * MoneyLevel;
        break;
      case 6:
        money += 800 * MoneyLevel;
        break;
      case 7:
        money = 2000 * MoneyLevel;
        break;
    }
  });

  return money;
}

function ATKBoost(wordLength, BaseATK) {
  let bonusATK = 0;

  wordLength.map((element) => {
    switch (element.length) {
      case 1:
        bonusATK += 0;
        break;
      case 2:
        bonusATK += BaseATK * 0.01;
        break;
      case 3:
        bonusATK += BaseATK * 0.02;
        break;
      case 4:
        bonusATK += BaseATK * 0.03;
        break;
      case 5:
        bonusATK += BaseATK * 0.05;
        break;
      case 6:
        bonusATK += BaseATK * 0.13;
        break;
      case 7:
        bonusATK += BaseATK * 0.3;
        break;
    }
  });
  return bonusATK;
}

function getBonusATK(entitiesList, wordLength) {
  // นำแสดงวิธีการนี้โดยพี่จ๊อบแจ๊บ โครตจ๊าบ
  // nowStat = JSON.parse(JSON.stringify(entitiesList));
  nowStat = _.cloneDeep(entitiesList)

  entitiesList.forEach((monster) => {
    if (monster.status.type == "Monster") {
      monster.status.Attack += Math.round(
        ATKBoost(wordLength, monster.status.Attack)
      );
    }
  });

  return entitiesList;
}

function clearBooster(entitiesList) {
  let newEntitiesList = entitiesList.filter(entity => { return entity.status.type != "Monster" })
  let oldMonsterStats = nowStat.filter(entity => { return entity.status.type == "Monster" })
  return [ ...newEntitiesList, ...oldMonsterStats ]
}

export {
  getNowStat,
  getBonusATK,
  clearBooster
}

// Example
// {
//   let entitiesList = [
//     {
//       status: {
//         Attack: 100,
//         Defense: 50,
//         Health: 100,
//         Speed: 50,
//         Stamina: 0,
//         id: "Ghost:0",
//         selected: false,
//         type: "Monster",
//       },
//     },
//     {
//       status: {
//         Attack: 250,
//         Defense: 50,
//         Health: 100,
//         Speed: 50,
//         Stamina: 0,
//         id: "Ghost:0",
//         selected: false,
//         type: "Monster",
//       },
//     },
//     {
//       status: {
//         Attack: 500,
//         Defense: 50,
//         Health: 100,
//         Speed: 50,
//         Stamina: 0,
//         id: "Ghost:0",
//         selected: false,
//         type: "K",
//       },
//     },
//   ];

//   let word = [
//     "word",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//     "over",
//   ];

//   let x = getBonusATK(word, entitiesList);

//   console.log(x)

//   console.log("--------------------------------------------------------")
//   x = clearBooster()

//   console.log(x)
// }
