let initialStat; // backup data

function DamageCalculator(attackerATK, TargetDEF) {
  return attackerATK - attackerATK * (TargetDEF / 100);
}

function getNowStat(BaseStat, Level) {
  let result = {
    HP: BaseStat.HP * Level,
    ATK: BaseStat.ATK * Level,
    DEF: BaseStat.DEF * Level,
  };
  nowStat = result;

  return result;
}

function MoneyDrops(wordLength, MoneyLevel) {
  let money = 0;

  switch (wordLength) {
    case 1:
      money = 10 * MoneyLevel;
      break;
    case 2:
      money = 50 * MoneyLevel;
      break;
    case 3:
      money = 100 * MoneyLevel;
      break;
    case 4:
      money = 200 * MoneyLevel;
      break;
    case 5:
      money = 400 * MoneyLevel;
      break;
    case 6:
      money = 800 * MoneyLevel;
      break;
    case 7:
      money = 2000 * MoneyLevel;
      break;
  }

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

function getBonusATK(wordLength, entitiesList) {
  // let MonsterArrays = entitiesList.filter(entity => {return entity.status.type == "Monster"})[N].status
  let nowStat = [...entitiesList]; // backup data

  // let MonsterArrays = entitiesList.filter((entity) => {
  //   return entity.status.type == "Monster";
  // });

  nowStat = nowStat.map((monster) => {
    if (monster.status.type == "Monster") {
        monster.status.Attack += Math.round(ATKBoost(wordLength, monster.status.Attack));
        return monster
    } else {
      return monster
    }
  });

  console.log(
    "--------------------------NOW------------------------------------"
  );
  console.log(nowStat);
  console.log(
    "--------------------------ENT------------------------------------"
  );
  console.log(entitiesList);

  return entitiesList;
}

function clearBooster() {
  console.log(nowStat);
}

// Example
{
  let entitiesList = [
    {
      status: {
        Attack: 100,
        Defense: 50,
        Health: 100,
        Speed: 50,
        Stamina: 0,
        id: "Ghost:0",
        selected: false,
        type: "Monster",
      },
    },
    {
      status: {
        Attack: 250,
        Defense: 50,
        Health: 100,
        Speed: 50,
        Stamina: 0,
        id: "Ghost:0",
        selected: false,
        type: "Monster",
      },
    },
    {
      status: {
        Attack: 500,
        Defense: 50,
        Health: 100,
        Speed: 50,
        Stamina: 0,
        id: "Ghost:0",
        selected: false,
        type: "K",
      },
    },
  ];

  let word = [
    "word",
    "over",
    "over",
    "over",
    "over",
    "over",
    "over",
    "over",
    "over",
    "over",
    "over",
    "over",
    "over",
  ];

  let x = getBonusATK(word, entitiesList);
}
