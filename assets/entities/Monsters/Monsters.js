import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (entityName, animation) => {
    switch (entityName) {
        case "Bat": return <LottieView ref={animation} source={require("../../images/Monster/Bat.json")}></LottieView>
        case "Ghost": return <LottieView ref={animation} source={require("../../images/Monster/Ghost.json")}></LottieView>
        case "Goblin": return <LottieView ref={animation} source={require("../../images/Monster/Goblin.json")}></LottieView>
    }
}