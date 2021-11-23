import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (entityName, animation) => {
    switch (entityName) {
        case "Archer": return <LottieView ref={animation} source={require("../../images/Character/Archer.json")}></LottieView>
        case "Assassin": return <LottieView ref={animation} source={require("../../images/Character/Assassin.json")}></LottieView>
        case "Fisherman": return <LottieView ref={animation} source={require("../../images/Character/Fisherman.json")}></LottieView>
        case "Hero": return <LottieView ref={animation} source={require("../../images/Character/Hero.json")}></LottieView>
        case "Priest": return <LottieView ref={animation} source={require("../../images/Character/Priest.json")}></LottieView>
        case "SoldierM": return <LottieView ref={animation} source={require("../../images/Character/SoldierM.json")}></LottieView>
        case "SoldierR": return <LottieView ref={animation} source={require("../../images/Character/SoldierR.json")}></LottieView>
        case "Tank": return <LottieView ref={animation} source={require("../../images/Character/Tank.json")}></LottieView>
        case "Wizard": return <LottieView ref={animation} source={require("../../images/Character/Wizard.json")}></LottieView>
    }
}