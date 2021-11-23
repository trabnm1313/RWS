import React from 'react'
import { Text, Image } from 'react-native'
import Entity from './entities/index'

let entities = {}

export default function(engine) {

    return {
        Engine: { engine: engine },
        Wait: { renderer: <Text style={{top: 30, left: 30}}> Wait </Text> },
        LoadingBackground: Entity.Background({x: 0, y:0}, {width: "100%", height: "100%"}, null, "Menu")
    }
}