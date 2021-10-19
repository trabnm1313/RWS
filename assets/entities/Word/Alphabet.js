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
        body: {
            status: props.status
        }
    }

    //Selected Color
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"

    const imageLoader = Word(props.status.letter)

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
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