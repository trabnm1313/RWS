import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, View } from 'react-native'
import Buttons from './Buttons'

let count = 0

const voiceLine = [
    "..."
]

const _Button = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    const response = {
        name: "BUTTON_CLICKED",
        id: props.status.id,
        body: {
            status: props.status,
        }
    }

    //Selected Color
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"
    
    const buttonLoader = Buttons(props.status.button)

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                {buttonLoader}
            </TouchableWithoutFeedback>
        </View>
    )
}

const Button = (engine, pos, size, status, button) => {
    if(status == null){
        status = {
            id: "Bat:"+count++,
            button: button,
            selected: false,
            type: "Button"
        }
    }


    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Button/>
    }
}

export {
    Button
}