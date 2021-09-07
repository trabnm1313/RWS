import React from 'react'
import { Image, Touchable, TouchableWithoutFeedback } from 'react-native'
import { v4 as uuidv4 } from 'uuid'

const voiceLine = [
    "You clicked me",
    "Ouch!!",
    "Hey, Don't touch me",
    "What are you doing!",
    "...",
    "....",
    "....."
]

const Knight = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    return(
        <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch({ name: "HERO_CLICKED:"+props.status.id, body: { status: props.status, voice: voiceLine[Math.floor(Math.random() * 6)]}} )  }>
            <Image style={{ position: "absolute", width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1}} source={require("../images/Soldier.png")}></Image>
        </TouchableWithoutFeedback>
    )
}

export default (engine, pos, size, status) => {
    if(status == null){
        status = {
            id: uuidv4(),
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
        renderer: <Knight/>
    }
}