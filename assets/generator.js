import Entity from "./entities"
import Constants from "../Constants"
import _ from 'lodash'
import React from 'react'
import { Image } from 'react-native'
import { loadStatus } from './systems/opendatabase'
import * as MathFunction from './systems/MathFunctions'

const CharacterList = []
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

    entities = {}

    if(Constants.team.length == 0){
        newEntity = Entity.Monster(engine, {x: Constants.MAX_WIDTH*0.01+(SIZE), y: Constants.MAX_HEIGHT*0.02+(SIZE)}, {width: SIZE, height: SIZE}, null, "Ghost") //Assign key and entity to object
        entities["Monster:0"] = newEntity
        Constants.team.push(_.cloneDeep(newEntity))
    }else{
        for(i=0; i<Constants.team.length; i++){
            console.log(">>> ", Constants.team.length)
            entities[Constants.team[i].status.id] = _.cloneDeep(Constants.team[i])
        }
    }


    // Right-side
    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        for(let j=0; j<2; j++) {
            newEntity = Entity.Human(engine, {x: Constants.MAX_WIDTH*0.842+(j*SIZE), y: Constants.MAX_HEIGHT*0.02+(i*SIZE)}, {width: SIZE, height: SIZE}, MathFunction.getNowStat(_.cloneDeep(BaseStats), Constants.Level), "Soldier") //Assign key and entity to object
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