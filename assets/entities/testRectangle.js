import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Matter from 'matter-js'
import Knight from "../image/Knight.png"

const TestRectangle = (props) => {
    const widthBody = props.body.bounds.max.x
    const heightBody = props.body.bounds.max.y

    const xBody = props.body.position.x / 2
    const yBody = props.body.position.y / 2

    const color = props.color

    return (
        <View style={{
            borderWidth: 1,
            borderColor: color,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}/>
    )
}

export default function (world, color, pos, size) {
    let rectangle = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {render: { sprite: { texture: "../image/Knight.png" }}})
    
    Matter.World.add(world, rectangle)
    
    return {
        body: rectangle,
        color,
        pos,
        renderer: <TestRectangle/>
    }
}
