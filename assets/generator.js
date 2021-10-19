import Entity from "./entities"
import Constants from "../Constants"
import _ from 'lodash'
import {currentWord} from './systems/GameLoop'

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

let entities = {}

const enemyGenerator = (engine) => {
    const SIZE = Constants.MAX_WIDTH*0.073891
    const SIZE_ITEM = Constants.MAX_WIDTH*0.061576
    const SIZE_BUTTON = Constants.MAX_WIDTH*0.067
    //Enemies Generator algorithim HERE
    
    //Left-side
    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        for(let j=0; j<2; j++) {
            newEntity = Entity.Goblin(engine, {x: Constants.MAX_WIDTH*0.01+(j*SIZE), y: Constants.MAX_HEIGHT*0.02+(i*SIZE)}, {width: SIZE, height: SIZE}) //Assign key and entity to object
            entities["Monster:"+i+''+j] = newEntity
        } 
    }

    // Right-side
    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        for(let j=0; j<2; j++) {
            newEntity = Entity.Soldier(engine, {x: Constants.MAX_WIDTH*0.842+(j*SIZE), y: Constants.MAX_HEIGHT*0.02+(i*SIZE)}, {width: SIZE, height: SIZE}) //Assign key and entity to object
            entities["Human:"+i+''+j] = newEntity
        }
    }

    // Items
    for(let i=0; i<2; i++){
        let newEntity = {} //Create empty object
        for(let j=0; j<2; j++) {
            newEntity = Entity.HP_Potion(engine, {x: Constants.MAX_WIDTH*0.03+(j*SIZE_ITEM), y: Constants.MAX_HEIGHT*0.6+(i*SIZE_ITEM)}, {width: SIZE_ITEM, height: SIZE_ITEM}) //Assign key and entity to object
            entities["Item:"+i+''+j] = newEntity
        }
    }

    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        for(let j=0; j<6; j++) {
            let randomPos = Math.round(Math.random() * (Alphabet.length-1))
            newEntity = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.30+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.54+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, null, Alphabet[randomPos]),  //Assign key and entity to object
            entities["Button:"+i+''+j] = newEntity
        }
    }

    //Input
    // for(let i=0; i<3; i++){
    //     let newEntity = {}
    //     let MonsterType = MonsterList[Math.round(Math.random() * (MonsterList.length-1))] //Random name from the [MonsterList] above.

    //     entities[MonsterType+i] = Entity.Soldier(engine, {x: (i*100)+50, y: 200}, {width: 50, height: 50}) //Create entity from the <MosterType> above.
    // }

    //Example of How to randomly create 3 enemy
    // for(let i=0; i<3; i++){
    //     let newEntity = {}
    //     let MonsterType = MonsterList[Math.round(Math.random() * (MonsterList.length-1))]

    //     entities[MonsterType+i] = Entity[MonsterType](engine, {x: (i*100)+50, y: 200}, {width: 100, height: 100})
    // }

}

module.exports = {
    generator: (engine, gameStage) => {
        //Example #1 with common generate
        // let Soldier = Entity.Soldier(engine, {x: 50, y: 50}, {width: 100, height: 100})
        // entities["Soldier"] = Soldier

        //Example #2 with generate function
        if(_.isEmpty(entities)){
            enemyGenerator(engine)
        }

        return entities  // entities = { {Soldier0: <Objects>}, {Soldier1 : <Objects>}, ... }
    },
}