import Entity from "./entities"

const CharacterList = []
const MonsterList = [
    "Bat",
    "Goblin"
]

let entities = {}

const enemyGenerator = (engine) => {
    //Enemies Generator algorithim HERE
    
    //Example of How to create 3 enemy in-line
    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        newEntity = Entity.Soldier(engine, {x: (i*100)+50, y: 400}, {width: 100, height: 100}) //Assign key and entity to object

        entities["Soldier:"+i] = newEntity
    }

    //Example of How to randomly create 3 enemy
    for(let i=0; i<3; i++){
        let newEntity = {}
        let MonsterType = MonsterList[Math.round(Math.random() * (MonsterList.length-1))]

        entities[MonsterType+i] = Entity[MonsterType](engine, {x: (i*100)+50, y: 200}, {width: 100, height: 100})
    }

}

export default (engine, gameStage) => {

    //Example #1 with common generate
    let Soldier = Entity.Soldier(engine, {x: 50, y: 50}, {width: 100, height: 100})
    entities["Soldier"] = Soldier

    //Example #2 with generate function
    enemyGenerator(engine)

    return entities  // entities = { {Soldier0: <Objects>}, {Soldier1 : <Objects>}, ... }
}