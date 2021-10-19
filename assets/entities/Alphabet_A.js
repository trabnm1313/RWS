import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'

let count = 0

const _Alphabet_A = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    const response = {
        name: "ALPHABET_CLICKED",
        id: props.status.id,
        body: {
            status: props.status
        }
    }

    //Selected Color
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                <Image style={{width:"100%", height:"100%"}} source={require("../images/Alphabet/A.png")}></Image>
            </TouchableWithoutFeedback>
        </View>
    )
}

const Alphabet_A = (engine, pos, size, status) => {
    if(status == null){
        status = {
            id: "A:"+count++,
            letter: "A",
            selected: false,
            type: "Alphabet"
        }
    }

    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Alphabet_A selected={status.selected}/>
    }
}

export {
    Alphabet_A
}