import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (entityName, animation) => {
    switch (entityName) {
        case "Archer": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/ArcherDeath.json")}></LottieView>
        case "Assassin": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/AssassinDeath.json")}></LottieView>
        case "Fisherman": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/FishermanDeath.json")}></LottieView>
        case "Hero": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/HeroDeath.json")}></LottieView>
        case "Priest": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/PriestDeath.json")}></LottieView>
        case "SoldierM": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/Soldier(Melee)Death.json")}></LottieView>
        case "SoldierR": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/Soldier(Range)Death.json")}></LottieView>
        case "Tank": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/TankDeath.json")}></LottieView>
        case "Wizard": return <LottieView ref={animation} loop={false} source={require("../../images/Character/Dead/WizardDeath.json")}></LottieView>
    }
}