export default function (entities, args){
    const events = args.events
    let selected = ""
    
    let entitiesList = Object.values(entities)

    if(events.length > 0){
        
        selected = events[0].id
        if(events[0].body != undefined){
            events[0]["body"]["status"]["selected"] = !events[0]["body"]["status"]["selected"]

            console.log("Selected: " + selected)
            console.log("Select Status: " + events[0].body.status.selected)
        }

        
        // events[0]["body"]["status"]

    }

    //Assign value to entities from array to object
    entities = { ...entitiesList }

    return entities
}