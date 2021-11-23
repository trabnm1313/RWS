import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, View } from 'react-native'
import LottieView from 'lottie-react-native'
import Backgrounds from './Backgrounds'

let count = 0

const _Background = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y

    const backgroundLoader = Backgrounds(props.status.background)

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody}}>
            {backgroundLoader}
        </View> 
    )
}

const Background = (pos, size, status, background) => {
    if(status == null){
        status = {
            id: "Background",
            type: "Background",
            background: background
        }
    }


    return{
        pos,
        size,
        status,
        renderer: <_Background/>
    }
}

export {
    Background
}