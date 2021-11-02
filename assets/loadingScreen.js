import React from 'react'
import { Text, Image } from 'react-native'
import Entity from './entities/index'

let entities = {}

export default function(engine) {
    return {
        Engine: { engine: engine },
        Wait: { renderer: <Text style={{top: 30, left: 30}}> Wait </Text> }
    }
}