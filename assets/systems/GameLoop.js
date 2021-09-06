

export default function (entities, { events, dispatch }){
    const Knight = entities.Knight
    
    //If events > 0 (one or more event occurs)
    if(events.length){
        events.forEach((event) => {
            if(event.name == "HERO_CLICKED"){
                Knight.status.Health -= 1
                console.log(Knight.status)
            }
        })
    }


    return entities
}