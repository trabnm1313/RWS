import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, Text, View, requireNativeComponent } from 'react-native'
import Humans from './Humans'

let count = 0

const _Human = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const entityName = (props.status.id).split(":")[0]
    const animation = React.useRef(null)

    const response = {
        name: "SOLDIER_CLICKED",
        id: props.status.id,
        status: props.status,
    }

    //onSelected change colour
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"

    const humanLoader = Humans("Soldier", animation)

    //Loop Animation
    React.useEffect(() => {
        animation.current.play()
    }, [])

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                {humanLoader}
            </TouchableWithoutFeedback>
        </View>
    )
}

const Human = (engine, pos, size, status, entity) => {
    if(status == null){
        status = {
            id: entity+":"+count++,
            Health: 100,
            Attack: 100,
            Defense: 50,
            Speed: 50,
            Stamina: 0,
            selected: false,
            isAlive: true,
            rested: false,
            type: "Human"
        }
    }

    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Human/>
    }
}

export {
    Human
}