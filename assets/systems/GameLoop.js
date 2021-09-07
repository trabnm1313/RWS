
export default function (entities, args){
    const events = args.events
    
    let entitiesList = Object.values(entities)

    // if(args.touches.length > 0){
    //     console.log(args.touches.filter(t => console.log(t)))
    // }
    
    // If events > 0 (one or more event occurs)
    if(events.length){
        //For each events occurs
        events.forEach((event) => {
            //Event handler
            console.log(entitiesList.map(entity => {return entity.status}))

            //If hero? got clicked
            if((event.name+"").includes("HERO_CLICKED")){

                //Which one is actually got clicked?
                entities = { ...entitiesList.map(entity => {
                    if(entity.status.id == (event.name+"").split(":")[1]){
                        entity.status.Health -= 1
                    }
                    return entity
                })}


            }   

        })
    }



    return entities
}