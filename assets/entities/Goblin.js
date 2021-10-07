import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback } from 'react-native'

let count = 0

const voiceLine = [
    "..."
]

const _Ghost = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    const response = {
        name: "GOBLIN_CLICKED",
        id: props.status.id,
        body: {
            status: props.status,
            voice: voiceLine[Math.floor(Math.random() * (voiceLine.length-1))] //Random 0 - maxVoiceLine-1 to display when event occurs
        }
    }

    return(
        <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
            <Image style={{ position: "absolute", width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1}} source={require("../images/Monster/Goblin.gif")}></Image>
        </TouchableWithoutFeedback>
    )
}

const Goblin = (engine, pos, size, status) => {
    if(status == null){
        status = {
            id: "Goblin"+count++,
            Health: 100,
            Attack: 100,
            Defense: 50,
            Speed: 50,
            Stamina: 0
        }
    }


    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Ghost/>
    }
}

export {
    Goblin
}