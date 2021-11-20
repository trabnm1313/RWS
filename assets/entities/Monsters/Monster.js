import React from 'react'
import { Image, NativeModules, Touchable, TouchableWithoutFeedback, Text, View, requireNativeComponent } from 'react-native'
import Monsters from './Monsters'

let count = 0

const _Monster = (props) => {
    const bodyWidth = props.size.width
    const bodyHeight = props.size.height
    const xBody = props.pos.x
    const yBody = props.pos.y
    const entityName = (props.status.id).split(":")[0]
    const animation = React.useRef(null)

    props.status["animation"] = animation

    const response = {
        name: "MONSTER_CLICKED",
        id: props.status.id,
        status: props.status,
    }

    //onSelected change colour
    let selectedColor
    if(props.status.selected){
        selectedColor = "yellow"
    }else{
        if(props.status.rested == true){
            selectedColor = "green"
        }else{
            selectedColor = "black"
        }
    }

    const monsterLoader = Monsters(entityName, animation)

    //Loop Animation
    React.useEffect(() => {
        animation.current.play()
    }, [])

    return(
        <View style={{position: 'absolute', width: bodyWidth, height: bodyHeight, left: xBody, top: yBody, borderWidth: 1, borderColor: selectedColor}}>
            <TouchableWithoutFeedback onPress={() => props.engine.current.dispatch(response)}>
                {monsterLoader}
            </TouchableWithoutFeedback>
        </View>
    )
}

const Monster = (engine, pos, size, status, entity) => {
    if(status == null){
        status = {
            Health: 100,
            Attack: 100,
            Defense: 50,
            selected: false,
            rested: false,
            isAlive: true,
            type: "Monster"
        }
    }

    status["id"] = entity+":"+count++

    return{
        engine,
        pos,
        size,
        status,
        renderer: <_Monster/>
    }

}

export {
    Monster
}