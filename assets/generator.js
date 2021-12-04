import Entity from "./entities"
import Constants from "../Constants"
import _ from 'lodash'
import React from 'react'
import { Image } from 'react-native'
import { loadStatus } from './systems/opendatabase'
import * as MathFunction from './systems/MathFunctions'

const CharacterList = [
    "Archer",
    "Assassin",
    "Fisherman",
    "Hero",
    "Priest",
    "SoldierM",
    "SoldierR",
    "Tank",
    "Wizard"
]
const MonsterList = [
    "Bat",
    "BigGoblin",
    "Devil",
    "Ghost",
    "Goblin",
    "SkeletonB",
    "SkeletonS",
    "SlimeB",
    "SlimeG",
    "SlimeR",
    "SlimeP",
    "Vampire",
    "Witch",
    "Zombie"
]
const Alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]

let BaseStats = {
    Health: 100,
    Attack: 100,
    Defense: 50,
    selected: false,
    isAlive: true,
    type: "Human"
}

let entities = {}
let SIZE, SIZE_ITEM, SIZE_BUTTON

const entitiesGenerator = (engine, words) => {
    if(Constants.MAX_HEIGHT > Constants.MAX_WIDTH){
        let temp = Constants.MAX_HEIGHT
        Constants.MAX_HEIGHT = Constants.MAX_WIDTH
        Constants.MAX_WIDTH = temp
    }
    SIZE = Constants.MAX_WIDTH*0.073891
    SIZE_ITEM = Constants.MAX_WIDTH*0.061576
    SIZE_BUTTON = Constants.MAX_WIDTH*0.067

    let row = 0
    let rowItem = 0
    entities = {}

    //Background Image
    entities["Background"] = Entity.Background({x: 0, y:0}, {width: "100%", height: "100%"}, null, "Battle")
    
    //Timer
    entities["Timer"] = Entity.Label({x: "45%", y:"5%"}, {width: 80, height: 30}, null, "Timer", "NaN")

    //Coin
    entities["Coin"] = Entity.Coin({x: 600, y: 300}, {width: 40, height: 40}, null, "Coin", Constants.money)

    //Heart
    entities["Heart"] = Entity.Heart({x: 600, y: 250}, {width: 40, height: 40}, null, "Heart", Constants.heart)


    if(Constants.team.length == 0){
        let newEntity = {} //Create empty object
        let randomCharacter = Math.floor(Math.random() * MonsterList.length)
        newEntity = Entity.Monster(engine, {x: Constants.MAX_WIDTH*0.01+(SIZE), y: Constants.MAX_HEIGHT*0.02+(SIZE)}, {width: SIZE, height: SIZE}, null, MonsterList[randomCharacter]) //Assign key and entity to object
        entities["Monster:0"] = newEntity
        Constants.team.push(_.cloneDeep(newEntity))
    }
    else{
        for(let i = 1; i <= Constants.team.length; i++){
            if(i%2 == 1) row++
            Constants.team[i-1].pos.x = Constants.MAX_WIDTH*0.01+(SIZE*(i%2+1))
            Constants.team[i-1].pos.y = Constants.MAX_HEIGHT*0.02+(SIZE*(row-1))
            Constants.team[i-1].size.width = SIZE
            Constants.team[i-1].size.height = SIZE
            entities[Constants.team[i-1].status.id] = _.cloneDeep(Constants.team[i-1])
        }
    }


    // Right-side
    for(let i=0; i<3; i++){
        for(let j=0; j<2; j++) {
            let newEntity = {} //Create empty object
            let randomCharacter = Math.floor(Math.random() * CharacterList.length)
            newEntity = Entity.Human(engine, {x: Constants.MAX_WIDTH*0.75+(j*SIZE), y: Constants.MAX_HEIGHT*0.02+(i*SIZE)}, {width: SIZE, height: SIZE}, MathFunction.getNowStat(_.cloneDeep(BaseStats), Constants.Level), CharacterList[randomCharacter]) //Assign key and entity to object
            entities["Human:"+i+''+j] = newEntity
        }
    }

    // Items
    for(let i=1; i <= Constants.item.length; i++){
        if(i%2 == 1) rowItem++
            Constants.item[i-1].pos.x = Constants.MAX_WIDTH*0.01+(SIZE_ITEM*(i%2+1))
            Constants.item[i-1].pos.y = Constants.MAX_HEIGHT*0.65+(SIZE_ITEM*(rowItem-1))
            Constants.item[i-1].size.width = SIZE_ITEM
            Constants.item[i-1].size.height = SIZE_ITEM
            entities[Constants.item[i-1].status.id] = _.cloneDeep(Constants.item[i-1])
    }

    for(let i=0; i<3; i++){
        for(let j=0; j<6; j++) {
            entities["Alphabet:" + i + j] = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.28+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.54+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, null, words[(i*6)+j])  //Assign key and entity to object
        }
    }


    
    return entities
}

export{
    entitiesGenerator
}