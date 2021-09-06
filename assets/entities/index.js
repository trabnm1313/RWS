import Matter, { Engine } from "matter-js"
import Knight from "./Knight"
import Constants from "../../Constants"

export default (engine) => {
    console.log(Constants)
    return{
        Knight: Knight(engine, {x: Constants.MAX_WIDTH/2, y: Constants.MAX_HEIGHT/2}, {width: 100, height:100}) 
    }
}