import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (entityName, animation) => {
    switch (entityName) {
        case "Bat": return <LottieView ref={animation} source={require("../../images/Monster/Bat.json")}></LottieView>
        case "BigGoblin": return <LottieView ref={animation} source={require("../../images/Monster/BigGoblin.json")}></LottieView>
        case "Devil": return <LottieView ref={animation} source={require("../../images/Monster/Devil.json")}></LottieView>
        case "Ghost": return <LottieView ref={animation} source={require("../../images/Monster/Ghost.json")}></LottieView>
        case "Goblin": return <LottieView ref={animation} source={require("../../images/Monster/Goblin.json")}></LottieView>
        case "SkeletonB": return <LottieView ref={animation} source={require("../../images/Monster/Skeleton_Bow.json")}></LottieView>
        case "SkeletonS": return <LottieView ref={animation} source={require("../../images/Monster/Skeleton_Shield.json")}></LottieView>
        case "SlimeB": return <LottieView ref={animation} source={require("../../images/Monster/slimeBlue.json")}></LottieView>
        case "SlimeG": return <LottieView ref={animation} source={require("../../images/Monster/slimeGreen.json")}></LottieView>
        case "SlimeR": return <LottieView ref={animation} source={require("../../images/Monster/slimeRed.json")}></LottieView>
        case "SlimeP": return <LottieView ref={animation} source={require("../../images/Monster/slimePink.json")}></LottieView>
        case "Vampire": return <LottieView ref={animation} source={require("../../images/Monster/Vampire.json")}></LottieView>
        case "Witch": return <LottieView ref={animation} source={require("../../images/Monster/Witch.json")}></LottieView>
        case "Zombie": return <LottieView ref={animation} source={require("../../images/Monster/Zombie.json")}></LottieView>
    }
}