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

const _Ghost = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const animation = React.useRef(null)

    const response = {
        name: "GHOST_CLICKED",
        id: props.status.id,
        body: {
            status: props.status,
            voice: voiceLine[Math.floor(Math.random() * (voiceLine.length-1))] //Random 0 - maxVoiceLine-1 to display when event occurs
        }
    }

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
                <LottieView ref={animation} source={require("../images/Monster/Ghost.json")}></LottieView>
            </TouchableWithoutFeedback>
        </View>
    )
}

const Ghost = (engine, pos, size, status) => {
    if(status == null){
        status = {
            id: "Ghost:"+count++,
            Health: 100,
            Attack: 100,
            Defense: 50,
            Speed: 50,
            Stamina: 0,
            selected: false,
            type: "Monster"
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
    Ghost
}