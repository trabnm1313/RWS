import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, View, Text} from 'react-native'
import Buttons from './Buttons'

let count = 0

const _Label = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const text = props.status.text

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: "white"}}>{text}</Text>
        </View>
    )
}

const Label = (pos, size, status, type, text) => {
    if(status == null){
        status = {
            id: "Text:"+count++,
            type: type,
            text: text
        }
    }


    return{
        pos,
        size,
        status,
        renderer: <_Label/>
    }
}

export {
    Label
}