import Constants from "../../Constants"
import Entity from "../entities/index"
import { loadStatus } from "./opendatabase"

let engine = null

export default function(entities, args){
    const events = args.events

    let entitiesList = Object.values(entities)
    if(engine == null && loadStatus != true) engine = entitiesList[0].engine
    
    //-----------------------------------------------------------------------------
    if(Constants.stage != "Menu") return entities
    
    //ปุ่ม
    entitiesList.push(Entity.Button(engine, {x: "43%", y: "80%"}, {width: 120, height: 50}, null, "Confirm"))

    if(events.length > 0 && events[0].status != undefined){
        if(events["0"].status.button == "Confirm"){
            Constants.stage = "Battle"
            console.log(Constants.stage)
        }
    }

    entities = { ...entitiesList }

    return entities
}