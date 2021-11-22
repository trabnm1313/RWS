import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (entityName, animation) => {
    switch (entityName) {
        case "Bat": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/BatDead.json")}></LottieView>
        case "BigGoblin": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/BigGoblinDead.json")}></LottieView>
        case "Devil": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/DevilDead.json")}></LottieView>
        case "Ghost": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/GhosttyDead.json")}></LottieView>
        case "Goblin": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/GoblinDead.json")}></LottieView>
        case "SkeletonB": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/Skeleton_BowDead.json")}></LottieView>
        case "SkeletonS": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/Skeleton_ShieldDead.json")}></LottieView>
        case "SlimeB": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/slimeBlueDead.json")}></LottieView>
        case "SlimeG": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/slimeGreenDead.json")}></LottieView>
        case "SlimeR": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/slimeRedDead.json")}></LottieView>
        case "SlimeP": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/slimePinkDead.json")}></LottieView>
        case "Vampire": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/VampireDead.json")}></LottieView>
        case "Witch": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/WitchDeath.json")}></LottieView>
        case "Zombie": return <LottieView ref={animation} loop={false} source={require("../../images/Monster/Dead/ZombieDead.json")}></LottieView>
    }
}