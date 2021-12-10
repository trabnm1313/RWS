import { Dimensions } from "react-native";
import React from "react"

let stage = "Menu"
let Level = 1
let money = 0
let team = []
let item = []
let engine = null

export default {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    engine,
    stage,
    Level,
    team,
    item,
    money
}