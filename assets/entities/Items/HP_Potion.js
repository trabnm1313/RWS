import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, View } from 'react-native'
import LottieView from 'lottie-react-native'

let count = 0

const voiceLine = [
    "You clicked me",
    "Ouch!!",
    "Hey, Don't touch me",
    "What are you doing!",
    "...",
    "....",
    "....."
]

const _HP_Potion = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    const response = {
        name: "POTION_CLICKED",
        id: props.status.id,
        body: {
            status: props.status,
            voice: voiceLine[Math.floor(Math.random() * (voiceLine.length-1))] //Random 0 - maxVoiceLine-1 to display when event occurs
        },
        status: props.status,
    }

    //Selected Color
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                <Image style={{width: '100%', height: '100%', resizeMode: "contain"}} source={require("../../images/Items/HP_Potion.png")}></Image>
            </TouchableWithoutFeedback>
        </View>
    )
}

const HP_Potion = (engine, pos, size, status) => {
    if(status == null){
        status = {
            id: "HP_Potion:"+count++,
            Health: 100,
            selected: false,
            type: "Potions"
        }
    }


    return{
        engine,
        pos,
        size,
        status,
        renderer: <_HP_Potion/>
    }
}

export {
    HP_Potion
}