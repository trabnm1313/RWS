import Constants from "../../Constants"
import Entity from "../entities/index"
import { loadStatus } from "./opendatabase"
import { Dimensions } from "react-native";

let engine = null

export default function(entities, args){
    const events = args.events

    let entitiesList = Object.values(entities)
    if(engine == null) engine = Constants.engine
    
    //-----------------------------------------------------------------------------
    if(Constants.stage != "Menu") return entities


    if(loadStatus){
        entitiesList.push(Entity.Background({x: 0, y:0}, {width: "100%", height: "100%"}, null, "Menu"))        
        entitiesList.push(Entity.Button(engine, {x: "43%", y: "75%"}, {width: 150, height: 80}, null, "Start"))
    }

    if(events.length > 0 && events[0].status != undefined){
        if(events["0"].status.button == "Start"){
            Constants.stage = "Battle"
        }
    }

    entities = { ...entitiesList }

    return entities
}