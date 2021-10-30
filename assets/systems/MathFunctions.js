
function DamageCalculator(attackerATK, TargetDEF) {
    return attackerATK - (attackerATK * (TargetDEF / 100))
}

function getStat(BaseStat, Level) {
    let result = {
        "HP" : BaseStat.HP * Level ,
        "ATK" : BaseStat.ATK * Level,
        "DEF" : BaseStat.DEF * Level
    }
    return result
}


function MoneyDrops(wordLength, MoneyLevel) {
    let money = 0;

    switch(wordLength) {
        case 1:
            money = 10 * MoneyLevel
            break
        case 2:
            money = 50 * MoneyLevel
            break
        case 3:
            money = 100 * MoneyLevel
            break
        case 4:
            money = 200 * MoneyLevel
            break
        case 5:
            money = 400 * MoneyLevel
            break
        case 6:
            money = 800 * MoneyLevel
            break
        case 7:
            money = 2000 * MoneyLevel
            break
    }

    return money
}

function ATKBoost(wordLength, BaseATK) {
    let bonusATK = 0;

    switch(wordLength) {
        case 1:
            bonusATK = 0
            break
        case 2:
            bonusATK = BaseATK * 0.01
            break
        case 3:
            bonusATK = BaseATK * 0.02
            break
        case 4:
            bonusATK = BaseATK * 0.03
            break
        case 5:
            bonusATK = BaseATK * 0.05
            break
        case 6:
            bonusATK = BaseATK * 0.13
            break
        case 7:
            bonusATK = BaseATK * 0.3
            break
    }

    return bonusATK
}