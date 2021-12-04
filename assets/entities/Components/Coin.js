import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, View, Text} from 'react-native'
import LottieView from 'lottie-react-native'

let count = 0

const _Coin = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const total = props.status.money

    return(

        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody}}>
            <LottieView source={require("../../images/Components/Coin.json")}></LottieView>
            <Text style={{ color: "white", fontWeight: "bold" , position: "absolute", left: 50, top: 10 }}>{total}</Text>
        </View>
    )
}

const Coin = (pos, size, status, type, money) => {
    if(status == null){
        status = {
            id: "Text:"+count++,
            type: type,
            money: money
        }
    }

    return{
        pos,
        size,
        status,
        renderer: <_Coin/>
    }
}

export {
    Coin
}