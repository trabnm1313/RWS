import Entity from '../entities/index'
import Constants from '../../Constants'
import findWord from '../systems/findWord'
import genWord from '../systems/genWord'

//Function
import { entitiesGenerator } from '../generator'

//Variable
import { Data, loadStatus } from '../systems/opendatabase'

import _ from 'lodash'
import entities from '../entities/index'

let initialGenerate = true
let engine = null

//Selected Entity
let humanSelected = "", monsterSelected = ""

//State Variables
let didWordChange = false
let phase = "alphabet"

//Common Variables
let currentWord = "", currentWordID = [], submitWord = ""
let entitiesList, words = [], attackQueue = []

const SIZE = Constants.MAX_WIDTH*0.073891
const SIZE_ITEM = Constants.MAX_WIDTH*0.061576
const SIZE_BUTTON = Constants.MAX_WIDTH*0.067

async function generateWord(){
    words = await genWord()
}

function wordEntityGenerator(entitiesList){
    entitiesList.push(Entity.Button(engine, {x: 100, y: 200}, {width: 100, height: 30}, null, "Confirm"))

    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        for(let j=0; j<6; j++) {
            newEntity = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.30+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.54+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, null, words[(i*6)+j]),  //Assign key and entity to object
            entitiesList.push(newEntity)
        }
    }
}

function clearWordEntity(entitiesList){
    let newEntitiesList = entitiesList.filter(entity => {
        if(entity.status.type == "Alphabet" || entity.status.button == "Confirm"){
            return false
        } else return true
    })
    return newEntitiesList
}

function clearDisplayWordEntity(entitiesList){
    let newEntitiesList = entitiesList.filter(entity => { 
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
    return newEntitiesList
}

export default function (entities, args){
    const events = args.events

    entitiesList = Object.values(entities)
    if(engine == null && loadStatus != true) engine = entitiesList[0].engine

    //Pre-Generate Words
    if(words.length == 0){
        words.push("YES")
        generateWord()
    }

    //-----------------------------------------------------------------------------
    if(Constants.stage != "Battle") return entities
    
    if(loadStatus){
        console.log()

        //Generate intitial entity
        if(initialGenerate && words.length > 1){
            initialGenerate = false
            return entitiesGenerator(engine, words)
        }else if(initialGenerate){
            return {}
        }

        if(events.length > 0 && events[0].status != undefined){

            //Selecting Phase
            if(phase == "monster"){

                //Selecting condition
                if(events["0"].status.type == "Monster" && monsterSelected == "" && events["0"].status.rested != true){ //Select monster first
                    monsterSelected = events[0]
                    monsterSelected.status.selected = true
                }else if(events["0"].id == monsterSelected.id){ //Select same monster, remove the selected on both side
                    monsterSelected.status.selected = false
                    monsterSelected = ""
                    humanSelected = ""
                }else if(events["0"].status.type == "Monster" && monsterSelected != "" && events["0"].status.rested != true){ //Selecte different monster while there is selected
                    monsterSelected.status.selected = false
                    if(humanSelected != ""){
                        humanSelected.status.selected = false
                        humanSelected = ""
                    }
                    monsterSelected = events[0]
                    monsterSelected.status.selected = true
                }else if(events["0"].status.type == "Human" && monsterSelected != ""){ //Select human after monster
                    humanSelected = events[0]
                    console.log(monsterSelected.status.id + " Attack " + humanSelected.status.id) //DEBUG
                    humanSelected.status.Health -= 1
                    console.log(humanSelected.id + " have " + humanSelected.status.Health + " HP left.") //DEBUG

                    //Clear out selected and move on to next phase when all monsters done attacking
                    //TODO
                    

                    //Remove target monster out of attackQueue
                    attackQueue.splice(attackQueue.indexOf(monsterSelected), 1)

                    //Clear state after attack
                    monsterSelected.status.rested = true
                    monsterSelected.status.selected = false
                    monsterSelected = ""
                    humanSelected = ""
                    
                    //Change phases
                    if(attackQueue.length == 0){
                        entitiesList = entitiesList.map(entity => {
                            if(entity.status.type == "Monster") entity.status.rested = false
                            return entity
                        })
                        phase = "human"
                    }


                    console.log("Phase: " + phase + ", Random attack from humanity has been initialized!") //DEBUG
                }

            //Alphabet phase
            }else if(phase == "alphabet"){

                //Select alphabet
                //If click at input alphabet and the display alphabet
                if(events[0].name == "ALPHABET_CLICKED" && currentWord.length < 7 && !currentWordID.includes(events[0].id)){
                    currentWord += events["0"].status.letter
                    currentWordID.push(events[0].id)
                    events[0].status.selected = true
                    //Todo

                    didWordChange = true
                }else if(events[0].status.type == "Alphabet_SHOW"){
                    entitiesList = clearDisplayWordEntity(entitiesList) //Clear current displayed word
                }

                //Buttons
                if(events[0].status.type == 'Button'){
                    //IF Confirm button clicked
                    if(events[0].status.button == "Confirm"){
                        //Remove All current Words
                        entitiesList = entitiesList.filter(entity => {
                            return entity.status.type != "Alphabet"
                        })
                        submitWord = currentWord
                        
                        //Check and apply buffs to current team members
                        //TODO

                        //Clear current displayed word and input
                        entitiesList = clearDisplayWordEntity(entitiesList)
                        entitiesList = clearWordEntity(entitiesList)

                        //Put monsters available into attackQueue
                        attackQueue = entitiesList.filter(entity => { return entity.status.type == "Monster" })

                        //Move on to the next phases <monster attack human>
                        phase = "monster"

                        //Pre-Generate new set of words
                        generateWord()
                        console.log(submitWord) //DEBUG: show submit word
                    }
                    

                }
            }
            
        }


        //Humanity phases
        if(phase == "human"){
            //Random Attack algorithm below
            //TODO


            wordEntityGenerator(entitiesList)
            phase = "alphabet"

        }else if(didWordChange){

            if(didWordChange){
                for(let i=0; i<1; i++){
                    let newEntity = {} //Create empty object
                    for(let j=0; j<currentWord.length; j++) {
                        newEntity = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.265+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.25+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, { id: currentWordID[j], letter: null, selected: false, type: "Alphabet_SHOW"}, currentWord[j]) //Assign key and entity to object
                        entitiesList.push(newEntity)
                    }
                }
    
                didWordChange = false
            }

        }
        
    }
    

    //Assign value to entities from array to object
    entities = { ...entitiesList }

    return entities
}