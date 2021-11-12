import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, View } from 'react-native'
import LottieView from 'lottie-react-native'

import Items from "./Items"

let count = 0

const _Item = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const animation = React.useRef(null)

    const response = {
        name: "ITEM_CLICKED",
        id: props.status.id,
        status: props.status,
    }

    //Selected Color
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"

    const imageLoader = Items(props.status.item, animation)

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                {imageLoader}
            </TouchableWithoutFeedback>
        </View>
    )
}

const Item = (engine, pos, size, status, item) => {
    if(status == null){
        status = {
            id: item+":"+count++,
            selected: false,
            type: "Item",
            item: item
        }
    }


    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Item/>
    }
}

export {
    Item
}