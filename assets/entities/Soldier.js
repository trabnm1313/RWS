import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, Text, View } from 'react-native'
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

const _Soldier = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const animation = React.useRef(null)

    const response = {
        name: "SOLDIER_CLICKED",
        id: props.status.id,
        body: {
            status: props.status,
            voice: voiceLine[Math.floor(Math.random() * (voiceLine.length-1))] //Random 0 - maxVoiceLine-1 to display when event occurs
        }
    }

    //Loop Animation
    React.useEffect(() => {
        animation.current.play()
    }, [])


    //Selected Color
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                <LottieView ref={animation} source={require("../images/Character/Soldier.json")}></LottieView>
            </TouchableWithoutFeedback>
        </View>
    )
}

const Soldier = (engine, pos, size, status) => {
    if(status == null){
        status = {
            id: "Soldier:"+count++,
            Health: 100,
            Attack: 100,
            Defense: 50,
            Speed: 50,
            Stamina: 0,
            selected: false
        }
    }

    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Soldier selected={status.selected}/>
    }
}

export {
    Soldier
}