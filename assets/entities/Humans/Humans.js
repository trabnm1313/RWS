import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (entityName, animation) => {
    switch (entityName) {
        case "Soldier": return <LottieView ref={animation} source={require("../../images/Character/SoldierMelee.json")}></LottieView>
    }
}