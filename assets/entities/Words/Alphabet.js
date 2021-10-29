import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, Text, View } from 'react-native'
import Word from "./Word"

let count = 0

const _Alphabet = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    const response = {
        name: "ALPHABET_CLICKED",
        id: props.status.id,
        status: props.status
    }

    //Selected Color
    let opacity
    if(props.status.selected){
        opacity = 'rgba(0,0,0,1)'
    }else opacity = 'rgba(255,255,255,1)'

    const imageLoader = Word(props.status.letter)

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, backgroundColor: opacity}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                {imageLoader}
            </TouchableWithoutFeedback>
        </View>
    )
}

const Alphabet = (engine, pos, size, status, letter) => {
    if(status == null){
        status = {
            id: letter+":"+count++,
            letter: letter,
            selected: false,
            type: "Alphabet"
        }
    }else{
        status.letter = letter
    }

    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Alphabet/>
    }
}

export {
    Alphabet
}