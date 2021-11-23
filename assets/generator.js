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

const entitiesGenerator = (engine, words) => {
    let SIZE = Constants.MAX_WIDTH*0.073891
    let SIZE_ITEM = Constants.MAX_WIDTH*0.061576
    let SIZE_BUTTON = Constants.MAX_WIDTH*0.067
    let row = 0

    entities = {}

    //Background Image
    entities["Background"] = Entity.Background({x: 0, y:0}, {width: "100%", height: "100%"}, null, "Battle")

    //Timer
    entities["Timer"] = Entity.Label({x: 650, y:250}, {width: 80, height: 30}, null, "Timer", "NaN")

    if(Constants.team.length == 0){
        let newEntity = {} //Create empty object
        let randomCharacter = Math.floor(Math.random() * MonsterList.length)
        newEntity = Entity.Monster(engine, {x: Constants.MAX_WIDTH*0.01+(SIZE), y: Constants.MAX_HEIGHT*0.02+(SIZE)}, {width: SIZE, height: SIZE}, MathFunction.getNowStat(_.cloneDeep(BaseStats), Constants.Level), MonsterList[randomCharacter]) //Assign key and entity to object
        entities["Monster:"+i+''+j] = newEntity
        Constants.team.push(newEntity)
    }
    else{
        for(let i = 1; i <= Constants.team.length; i++){
            if(i%2 == 1) row++
            Constants.team[i-1].pos.x = Constants.MAX_WIDTH*0.01+(SIZE*(i%2+1))
            Constants.team[i-1].pos.y = Constants.MAX_HEIGHT*0.02+(SIZE*(row-1))
            entities[Constants.team[i-1].status.id] = _.cloneDeep(Constants.team[i-1])
        }
    }


    // Right-side
    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        let randomCharacter = Math.floor(Math.random() * CharacterList.length)
        for(let j=0; j<2; j++) {
            newEntity = Entity.Human(engine, {x: Constants.MAX_WIDTH*0.842+(j*SIZE), y: Constants.MAX_HEIGHT*0.02+(i*SIZE)}, {width: SIZE, height: SIZE}, MathFunction.getNowStat(_.cloneDeep(BaseStats), Constants.Level), CharacterList[randomCharacter]) //Assign key and entity to object
            entities["Human:"+i+''+j] = newEntity
        }
    }
    

    // Items
    for(let i=0; i<2; i++){
        let newEntity = {} //Create empty object
        for(let j=0; j<2; j++) {
            newEntity = Entity.Item(engine, {x: Constants.MAX_WIDTH*0.03+(j*SIZE_ITEM), y: Constants.MAX_HEIGHT*0.6+(i*SIZE_ITEM)}, {width: SIZE_ITEM, height: SIZE_ITEM}, null, "HP_POTION") //Assign key and entity to object
            entities["Item:"+i+''+j] = newEntity
        }
    }

    for(let i=0; i<3; i++){
        for(let j=0; j<6; j++) {
            entities["Alphabet:" + i + j] = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.30+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.54+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, null, words[(i*6)+j])  //Assign key and entity to object
        }
    }


    return entities
}

export{
    entitiesGenerator
}