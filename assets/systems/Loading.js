import { loadStatus } from "./opendatabase"
import React from 'react'
import { Text, Image } from 'react-native'

let engine = null

export default function(entities, args){

    let entitiesList = Object.values(entities)
    if(engine == null && loadStatus != true) engine = entitiesList[0].engine


    return entities
}