import Entity from '../entities/index'
import Constants from '../../Constants'
import findWord from '../systems/findWord'
import genWord from '../systems/genWord'
import { Data, loadStatus } from '../systems/opendatabase'
import { enemyGenerator } from '../generator'

import _ from 'lodash'

let initialGenerate = true
let engine = null

let humanSelected = "", monsterSelected = ""
let currentWord = "", currentWordID = [], summitWord = "", didWordChange = false, deleteWord = false
let words = []

const SIZE = Constants.MAX_WIDTH*0.073891
const SIZE_ITEM = Constants.MAX_WIDTH*0.061576
const SIZE_BUTTON = Constants.MAX_WIDTH*0.067

async function generateWord(){
    words = await genWord()
}

export default function (entities, args){
    const events = args.events

    let entitiesList = Object.values(entities)
    if(engine == null && loadStatus != true) engine = entitiesList[0].engine

    //Pre-Generate Words
    if(words.length == 0){
        words.push("YES")
        generateWord()
    }

    if(loadStatus){

        //Generate intitial entity
        if(initialGenerate){
            initialGenerate = false
            return enemyGenerator(engine, "Battle")
        }

        if(events.length > 0 && events[0].body != undefined){
            
            //Select Monster || Human
            if(events["0"].body.status.type == "Monster" && monsterSelected == ""){ //Select monster first
                monsterSelected = events[0]
                monsterSelected.body.status.selected = true
            }else if(events["0"].id == monsterSelected.id){ //Select same monster, remove the selected on both side
                monsterSelected.body.status.selected = false
                monsterSelected = ""
                humanSelected = ""
            }else if(events["0"].body.status.type == "Monster" && monsterSelected != ""){ //Selecte different monster while there is selected
                monsterSelected.body.status.selected = false
                if(humanSelected != ""){
                    humanSelected.body.status.selected = false
                    humanSelected = ""
                }

                monsterSelected = events[0]
                monsterSelected.body.status.selected = true
            }else if(events["0"].body.status.type == "Human" && monsterSelected != ""){ //Select human after monster
                humanSelected = events[0]
                console.log(monsterSelected.body.status.id + " Attack " + humanSelected.body.status.id)
                humanSelected.body.status.Health -= 1
                console.log(humanSelected.id + " have " + humanSelected.body.status.Health + " HP left.")
            }

            //Select alphabet
            if(events[0].name == "ALPHABET_CLICKED" && currentWord.length < 7 && !currentWordID.includes(events[0].id)){
                currentWord += events["0"].body.status.letter
                currentWordID.push(events[0].id)
                events[0].body.status.selected = true
                //Todo

                didWordChange = true
            }else if(events[0].body.status.type == "Alphabet_SHOW"){
                deleteWord = true
            }
            
            //Buttons
            if(events[0].body.status.type == 'Button'){
                //IF Confirm button clicked
                if(events[0].body.status.button == "Confirm"){
                    //Remove All current Words
                    entitiesList = entitiesList.filter(entity => {
                        return entity.status.type != "Alphabet"
                    })

                    //Generate new Alphabet Entity using chars from `words`
                    for(let i=0; i<3; i++){
                        let newEntity = {} //Create empty object
                        for(let j=0; j<6; j++) {
                            newEntity = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.30+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.54+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, null, words[(i*6)+j]),  //Assign key and entity to object
                            entitiesList.push(newEntity)
                        }
                    }

                    //Pre-Generate new set of words
                    generateWord()
                }
                

            }
        }

        if(didWordChange){
            for(let i=0; i<1; i++){
                let newEntity = {} //Create empty object
                for(let j=0; j<currentWord.length; j++) {
                    newEntity = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.265+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.25+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, { id: currentWordID[j], letter: null, selected: false, type: "Alphabet_SHOW"}, currentWord[j]) //Assign key and entity to object
                    entitiesList.push(newEntity)
                }
            }

            didWordChange = false
        }else if(deleteWord){
            entitiesList = entitiesList.filter(entity => { 
                if(currentWordID.includes(entity.status.id)){
                    if(entity.status.type == "Alphabet_SHOW"){
                        return false
                    }
                    entity.status.selected = false
                    return true
                }
                return true
            })

            currentWord = ""
            currentWordID = []
            deleteWord = false
        }
        
    }
    

    //Assign value to entities from array to object
    entities = { ...entitiesList }

    return entities
}