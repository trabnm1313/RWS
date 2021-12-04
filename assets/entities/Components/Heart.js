import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, View, Text} from 'react-native'
import LottieView from 'lottie-react-native'

let count = 0

const _Heart = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const total = props.status.left

    return(

        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody}}>
            <LottieView source={require("../../images/Components/Heart.json")}></LottieView>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 , position: "absolute", left: 50, top: 5}}>{total}</Text>
        </View>

    )
}

const Heart = (pos, size, status, type, left) => {
    if(status == null){
        status = {
            id: "Text:"+count++,
            type: type,
            left: left
        }
    }

    return{
        pos,
        size,
        status,
        renderer: <_Heart/>
    }
}

export {
    Heart
}