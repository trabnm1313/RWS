import Soldier from "./Soldier"
import Constants from "../../Constants"

function generatedEnemies(engine){
    
    let enemiesList = []
    for(let i=0; i<6; i++){
        let pos = Math.floor(Math.random()*4)+1
        enemiesList.push(Soldier(engine, {x: Constants.MAX_WIDTH/pos, y: Constants.MAX_HEIGHT/pos}, {width: 100, height:100}))
    }


    return { ...enemiesList }
}

export default (engine, gameStage) => {
    let entities

    if(gameStage == "MENU"){
        entities = {
            Soldier: Soldier(engine, {x: Constants.MAX_WIDTH/2, y: Constants.MAX_HEIGHT/2}, {width: 100, height:100}) 
        }
    }else if(gameStage == "onField"){
        entities = generatedEnemies(engine)
    }
    
    console.log(entities)

    return entities
}