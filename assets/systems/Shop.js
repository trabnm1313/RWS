import Constants from "../../Constants"
import Entity from "../entities/index"
import { random } from "lodash"
// import { loadStatus } from "./opendatabase"

let engine = null
let state1 = null
let pocket = []
let itemInshop = []

function randomItem() {
    while(itemInshop.length <= 9) {
        // itemInshop.push(Entity.allItem[0](engine, {x: 230, y: 10}, {width: 100, height: 60}, null))
    }
}

function buy(item) {
    pocket.push(item)
    console.log("Buy")
    console.log(pocket)
}

export default function(entities, args){
    const events = args.events

    let entitiesList = Object.values(entities)
    if(engine == null) engine = entitiesList[0].engine
    
    if (state1 === null) {
        state1 = "yes"
        entitiesList.push(Entity.HP_Potion(engine, {x: 230, y: 10}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 340, y: 10}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 460, y: 10}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 230, y: 75}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 340, y: 75}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 460, y: 75}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 230, y: 140}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 340, y: 140}, {width: 100, height: 60}, null))
        entitiesList.push(Entity.HP_Potion(engine, {x: 460, y: 140}, {width: 100, height: 60}, null))
    }

    if(events.length > 0 && events[0].status != undefined){
        if(events["0"].status.type == "Potions"){
            // buy(events["0"].id)

            
            // buy()
        }
    }

    entities = { ...entitiesList }

    return entities
}