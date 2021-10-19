import Entity from '../entities/index'
import Constants from '../../Constants'

let humanSelected = "", monsterSelected = "", currentWord = "", summitWord = ""

export default function (entities, args){
    const events = args.events
    
    let entitiesList = Object.values(entities)

    if(events.length > 0 && events[0].body != undefined){
        console.log(events)
        
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
            currentWord += events["0"].body.status.letter
        }
        
        // events[0]["body"]["status"]
    }

    const engine = entitiesList[0].engine
    const SIZE = Constants.MAX_WIDTH*0.073891
    const SIZE_ITEM = Constants.MAX_WIDTH*0.061576
    const SIZE_BUTTON = Constants.MAX_WIDTH*0.067

    if(currentWord != ""){
        for(let i=0; i<1; i++){
            let newEntity = {} //Create empty object
            for(let j=0; j<currentWord.length; j++) {
                newEntity = Entity.Alphabet(engine, {x: Constants.MAX_WIDTH*0.265+(j*SIZE_BUTTON), y: Constants.MAX_HEIGHT*0.25+(i*SIZE_BUTTON)}, {width: SIZE_BUTTON, height: SIZE_BUTTON}, null, currentWord[j]) //Assign key and entity to object
                entitiesList.push(newEntity)
            }
        }
    }

    

    //Assign value to entities from array to object
    entities = { ...entitiesList }

    return entities
}