import Entity from "./entities"

let entities = []

const enemyGenerator = (engine) => {
    //Enemies Generator algorithim HERE
    
    //Example of How to create 3 enemy in-line
    for(let i=0; i<3; i++){
        let newEntity = {} //Create empty object
        newEntity["Soldier" + i] = Entity.Soldier(engine, {x: (i*100)+50, y: 200}, {width: 100, height: 100}) //Assign key and entity to object

        entities.push(newEntity["Soldier" + i])
    }

}

export default (engine, gameStage) => {

    //Example #1 with common generate
    // let Soldier = Entity.Soldier(engine, {x: 50, y: 50}, {width: 100, height: 100})
    // entities.push(Soldier)

    //Example #2 with generate function
    enemyGenerator(engine)



    return entities // entities = [{Soldier0: <Objects>}, {Soldier1 : <Objects>}, ...]
}