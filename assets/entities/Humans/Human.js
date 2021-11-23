import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, Text, View, requireNativeComponent } from 'react-native'
import Humans from './Humans'
import DeadHumans from './DeadHumans'

let count = 0

const _Human = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const entityName = (props.status.id).split(":")[0]
    const animation = React.useRef(null)
    const isAlive = props.status.isAlive

    const response = {
        name: "HUMAN_CLICKED",
        id: props.status.id,
        status: props.status,
    }

    //onSelected change colour
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else selectedColor = "black"

    const humanLoader = isAlive ? Humans(entityName, animation) : DeadHumans(entityName, animation)

    //Loop Animation
    React.useEffect(() => {
        animation.current.reset()
        animation.current.play()
    }, [isAlive])

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
            Health: 100,
            Attack: 100,
            Defense: 50,
            selected: false,
            isAlive: true,
            rested: false,
            type: "Human"
        }
    }

    status["id"] = entity+":"+count++

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