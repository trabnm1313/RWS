let humanSelected = "", monsterSelected = "", currentWord = "", summitWord = ""

export default function (entities, args){
    const events = args.events
    
    let entitiesList = Object.values(entities)

    if(events.length > 0 && events[0].body != undefined){
        console.log(currentWord)
        
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
        if(events["0"].name == "ALPHABET_CLICKED"){
            currentWord += "T"
        }
        
        // events[0]["body"]["status"]

    }

    //Assign value to entities from array to object
    entities = { ...entitiesList }

    return entities
}