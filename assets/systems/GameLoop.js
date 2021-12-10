import Entity from '../entities/index'
import Constants from '../../Constants'

import genWord from '../systems/genWord'

//Function
import { entitiesGenerator } from '../generator'
import {getBonusATK, MoneyDrops} from '../systems/MathFunctions'
import findWord from './findWord'

//Variable
import { Data, loadStatus } from '../systems/opendatabase'

import _ from 'lodash'
import { Label } from '../entities/Components/Text'

let x = true

let initialGenerate = true
let engine = null

//Configuration
const ALPHABET_TIME = 10 + 1

//Selected Entity
let humanSelected = "", monsterSelected = ""

//State Variables
let didWordChange = false
let phase = "alphabet"

//Common Variables
let delay = 0, startTime = 0
let Label_HP, Label_ATK, Label_DEF, HumanHP = []
let time = ALPHABET_TIME, timer = setInterval(countdown, 1000), timerText = null
let currentWord = "", currentWordID = [], submitWord = []
let entitiesList, words = [], attackQueue = []

let SIZE, SIZE_BUTTON, SIZE_ITEM

function generateWord(){
    words = genWord()
}

function countdown() {
    time -= 1
    if(timerText != undefined) timerText.status.text = "Timer: " + time
}

function updateSelectStatus(){
    //Monster Status
    if(monsterSelected == ""){
        Label_HP.status.text = "HP: -"
        Label_ATK.status.text = "ATK: -"
        Label_DEF.status.text = "DEF: -"
    }else{
        Label_HP.status.text = "HP: " + monsterSelected.status.Health
        Label_ATK.status.text = "ATK: " + monsterSelected.status.Attack
        Label_DEF.status.text = "DEF: " + monsterSelected.status.Defense
    }

    //Human Status
    for(let i=0; i < HumanHP.length; i++){
        HumanHP[i].status.text = "HP: " + entitiesList.filter(entity => { return entity.status.id == HumanHP[i].status.type.split("_")[1] })[0].status.Health
    }
}

function attackNotify(human, monster, index){
    entitiesList.push(Entity.Label({x: "33%", y: (10+(5*index))+"%"}, {width: 400, height: 30}, null, "Notify", "Human: " + human.status.id + " attack " + monster.status.id))
}

function wordEntityGenerator(entitiesList){

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
        }else return true
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
        }else if(entity.status.button == "Confirm"){
            return false
        }
        return true
    })

    currentWord = ""
    currentWordID = []
    return newEntitiesList
}

function changePhases(toPhase){
    if(toPhase == "alphabet"){
        phase = "alphabet"

        wordEntityGenerator(entitiesList)
        submitWord = []
        time = ALPHABET_TIME

    }else if(toPhase == "monster"){

        //Put monsters available into attackQueue
        attackQueue = entitiesList.filter(entity => { return entity.status.type == "Monster" && entity.status.isAlive == true })
        
        phase = "monster"

    }else if(toPhase == "human"){
        phase = "human"
        entitiesList = entitiesList.map(entity => {
            if(entity.status.type == "Monster"){
                entity.status.rested = false
            }
            return entity
        })
    }
}

export default function (entities, args){
    const events = args.events

    entitiesList = Object.values(entities)
    if(engine == null) engine = Constants.engine

    //Pre-Generate Words
    // if(words.length == 0){
    //     words.push("YES")
    //     generateWord()
    // }

    //-----------------------------------------------------------------------------
    if(Constants.stage != "Battle") return entities
    
    if(loadStatus){

        if (x) {
            x = false
            generateWord()
        }

        //Generate intitial entity
        if(initialGenerate && words.length > 1){
            if(Constants.MAX_HEIGHT > Constants.MAX_WIDTH){
                let temp = Constants.MAX_HEIGHT
                Constants.MAX_HEIGHT = Constants.MAX_WIDTH
                Constants.MAX_WIDTH = temp
            }
            SIZE = Constants.MAX_WIDTH*0.073891
            SIZE_ITEM = Constants.MAX_WIDTH*0.061576
            SIZE_BUTTON = Constants.MAX_WIDTH*0.067
            time = ALPHABET_TIME
            initialGenerate = false
            generateWord()
            let returnEntities = entitiesGenerator(engine, words, Constants.Level)
            Label_HP = returnEntities["Label:1"]
            Label_ATK = returnEntities["Label:2"]
            Label_DEF = returnEntities["Label:3"]
            timerText = returnEntities.Timer
            HumanHP = Object.values(returnEntities).filter(entity => {return entity.status.type.includes("HumanHP_")})
            entitiesList = Object.values(returnEntities)
            updateSelectStatus()
            return returnEntities
        }else if(initialGenerate){
            return {}
        }

        //Check for delay event
        if(delay != 0){
            if((Math.abs(time) - Math.abs(startTime)) >= delay){
                //Clear delay 
                delay = 0
                startTime = 0

                //Todo
                return entitiesList.filter(entity => { return entity.status.type != "Notify" })
            }
        }


        //If there is more than 0 events occurs (object being touch and dispatch events, etc)
        if(events.length > 0 && events[0].status != undefined){      

            //Selecting Phase
            if(phase == "monster"){

                //Selecting condition
                if(events["0"].status.type == "Monster" && monsterSelected == "" && events["0"].status.rested != true && events["0"].status.isAlive){ //Select monster first
                    monsterSelected = events[0]
                    monsterSelected.status.selected = true
                    updateSelectStatus()
                }else if(events["0"].id == monsterSelected.id){ //Select same monster, remove the selected on both side
                    monsterSelected.status.selected = false
                    monsterSelected = ""
                    humanSelected = ""
                    updateSelectStatus()
                }else if(events["0"].status.type == "Monster" && monsterSelected != "" && events["0"].status.rested != true && events["0"].status.isAlive){ //Selecte different monster while there is selected
                    monsterSelected.status.selected = false
                    if(humanSelected != ""){
                        humanSelected.status.selected = false
                        humanSelected = ""
                    }
                    monsterSelected = events[0]
                    monsterSelected.status.selected = true
                    updateSelectStatus()
                }else if(events["0"].status.type == "Human" && monsterSelected != "" && events["0"].status.isAlive == true){ //Select human after monster and human not dead yet
                    humanSelected = events[0]
                    humanSelected.status.Health -= monsterSelected.status.Attack

                    //Change if the attacked human is dead yet
                    if(humanSelected.status.Health <= 0) humanSelected.status.isAlive = false

                    //DEBUG
                    console.log(monsterSelected.status.id + " Attack " + humanSelected.status.id)
                    console.log(humanSelected.id + " have " + humanSelected.status.Health + " HP left and isAlive:" + humanSelected.status.isAlive)
                    

                    //Remove target monster out of attackQueue
                    attackQueue.splice(attackQueue.indexOf(monsterSelected), 1)

                    //Clear state after attack
                    monsterSelected.status.rested = true
                    monsterSelected.status.selected = false
                    monsterSelected = ""
                    humanSelected = ""
                    updateSelectStatus()

                    //if all human died, victory
                    let humanLeft = entitiesList.filter(entity => { return entity.status.type == "Human" && entity.status.isAlive == true})
                    if(humanLeft.length == 0){

                        //mock gameLooping itself, no other stage yet
                        //-----------------------------------------
                        // changePhases("alphabet")
                        // return entitiesGenerator(engine, words)
                        //-----------------------------------------
                        
                        //Constants.stage = <whatever> here
                        changePhases("alphabet")
                        entitiesList = []
                        Constants.Level += 1
                        Constants.stage = "Shop"
                        initialGenerate = true
                        time = ALPHABET_TIME
                        return {}

                    }
                    
                    //Change phases when the last monster attacked
                    if(attackQueue.length == 0){
                        changePhases("human")
                    }


                    console.log("Phase: " + phase + ", Random attack from humanity has been initialized!") //DEBUG
                }

                //Check if player click at items
                if(events["0"].status.type == "Item"){

                    if(events["0"].status.item == "HP_POTION"){
                        entitiesList = entitiesList.map(entity => {
                            if(entity.status.type == "Monster") entity.status.Health += 20
                            return entity
                        })
                    }else if(events["0"].status.item == "Attack_POTION"){
                        entitiesList = entitiesList.map(entity => {
                            if(entity.status.type == "Monster") entity.status.Attack += (entity.status.Attack * 20 ) / 100
                            return entity
                        })
                    }else if(events["0"].status.item == "Defense_POTION"){
                        entitiesList = entitiesList.map(entity => {
                            if(entity.status.type == "Monster") entity.status.Defense += (entity.status.Defense * 20 ) / 100
                            return entity
                        })
                    }else if(events["0"].status.item == "Dynamite"){
                        entitiesList = entitiesList.map(entity => {
                            if(entity.status.type == "Human") entity.status.Health -= (entity.status.Health * 30) / 100 
                            return entity
                        })
                    }

                    updateSelectStatus()
                    
                    //Removed used item from Constants
                    Constants.item = Constants.item.filter(item => { return item.status.id != events["0"].status.id})

                    //remove used item
                    entitiesList = entitiesList.filter(entity => {return entity.status.id != events["0"].status.id})


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

                    let founded = findWord(currentWord)

                    if(founded == 0){
                        entitiesList = entitiesList.filter(entity => {return entity.status.button != "Confirm"})
                    } else if(entitiesList.filter(entity => {return entity.status.button == "Confirm"}).length == 0){
                        entitiesList.push(Entity.Button(engine, {x: 100, y: 200}, {width: 100, height: 30}, null, "Confirm"))
                    }
                    

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

                        generateWord()
                        submitWord.push(currentWord)
                        
                        //Check and apply buffs to current team members
                        //TODO

                        //Clear current displayed word and input
                        entitiesList = clearDisplayWordEntity(entitiesList)
                        entitiesList = clearWordEntity(entitiesList)

                        wordEntityGenerator(entitiesList)

                        //Pre-Generate new set of words
                        generateWord()
                        
                        console.log(submitWord) //DEBUG: show submit word
                    }
                    

                }
            }
            
        }


        //Humanity phases
        if(phase == "alphabet"){

            //Change if currentWord change or not to putting displayed words
            if(didWordChange){

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

            if(time <= -1){
                //Clear current displayed word and input
                entitiesList = clearDisplayWordEntity(entitiesList)
                entitiesList = clearWordEntity(entitiesList)

                //Give money for each words success
                Constants.money += MoneyDrops(submitWord, 1)
                console.log("Current money: " + Constants.money)

                //Remove timer
                entitiesList = entitiesList.filter(entity => { return entity.status.type != "Timer" })
    
                //boost monster ATK for word completed
                entitiesList = getBonusATK(entitiesList, submitWord)
                updateSelectStatus()
                
                changePhases("monster")
            }

        }else if(phase == "monster"){
            //TODO


        }else if(phase == "human"){
            //Random Attack algorithm below
            //TODO
            let humanAttackQueue = entitiesList.filter(entity => {
                return entity.status.type == "Human" && entity.status.isAlive == true
            })
            
            for(let i=0; i<humanAttackQueue.length; i++){
                let allMonster = entitiesList.filter(entity => {return entity.status.type == "Monster" && entity.status.isAlive == true})
                let randomPosition = Math.floor(Math.random() * allMonster.length)
                
                allMonster[randomPosition].status.Health -= humanAttackQueue[i].status.Attack - Math.floor((humanAttackQueue[i].status.Attack * allMonster[randomPosition].status.Defense) / 100)

                //Check if monster dead yet
                if(allMonster[randomPosition].status.Health <= 0) allMonster[randomPosition].status.isAlive = false

                let monsterLeft = entitiesList.filter(entity => { return entity.status.type == "Monster" && entity.status.isAlive == true})
                if(monsterLeft.length == 0){

                    //mock gameLooping itself, no other stage yet
                    //-----------------------------------------
                    // changePhases("alphabet")
                    // return entitiesGenerator(engine, words)
                    //-----------------------------------------
                    
                    //Constants.stage = <whatever> here
                    changePhases("alphabet")
                    console.log("Game Over")
                    entitiesList = []
                    Constants.money = 0
                    Constants.Level = 1
                    Constants.stage = "Menu"
                    initialGenerate = true
                    time = ALPHABET_TIME
                    return {}

                }

                if(entitiesList.filter(entity => {return entity.status.type == "Notify"}).length >= entitiesList.filter(entity => {return entity.status.type == "Human" && entity.status.isAlive == true}).length){
                    entitiesList = entitiesList.filter(entity => { return entity.status.type != "Notify"})
                }
                attackNotify(humanAttackQueue[i], allMonster[randomPosition], i+1)
                console.log(humanAttackQueue[i].status.id + " attack " + allMonster[randomPosition].status.id)
                console.log("HP: " + allMonster[randomPosition].status.Health +" isAlive: " + allMonster[randomPosition].status.isAlive + " isRested: " + allMonster[randomPosition].status.rested)
            }

            //Start delay return
            startTime = time
            delay = 3

            changePhases("monster")

        }
        
    }

    //Assign value to entities from array to object
    entities = { ...entitiesList }

    return entities
}