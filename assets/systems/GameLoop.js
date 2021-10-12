
export default function (entities, args){
    const events = args.events
    
    let entitiesList = Object.values(entities)

    // if(args.touches.length > 0){
    //     console.log(args.touches.filter(t => console.log(t)))
    // }
    
    // If events > 0 (one or more event occurs)
    if(events.length){
        //For each events occurs
        events.forEach((response) => {
            //Event handler

            //If hero? got clicked
            if(response.name == "HERO_CLICKED"){

                //Which one is actually got clicked?
                entitiesList = entitiesList.map(entity => {
                    if(entity.status.id == response.id){
                        entity.status.Health -= 1
                        console.log(entity.status.id, "HP: " + entity.status.Health)
                    }
                    if(entity.status.Health > 0){
                        return entity
                    }else console.log("DEAD")
                })

            }   

        })
    }

    //Remove undefines from mapping
    entitiesList = entitiesList.filter(entity => {
        if(entity != undefined) return true
        else false
    })

    //Assign value to entities from array to object
    entities = { ...entitiesList }

    return entities
}