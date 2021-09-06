import React from 'react'
import { Image, Touchable, TouchableWithoutFeedback } from 'react-native'

const voiceLine = ["You clicked me", "Ouch!!", "Hey, Don't touch me", "What are you doing!", "...", "....", "....."]

let status = {
    Health: 100,
    Attack: 100,
    Defense: 50,
    Speed: 50,
    Stamina: 0
}

const Knight = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    return(
        <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch({ name: "HERO_CLICKED", body: { status: props.status, voice: voiceLine[Math.floor(Math.random() * 6)]}} )  }>
            <Image style={{ position: "absolute", width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1}} source={require("../images/Knight.png")}></Image>
        </TouchableWithoutFeedback>
    )
}

export default (engine, pos, size) => {

    return{
        engine,
        pos,
        size,
        status,
        renderer: <Knight/>
    }
}