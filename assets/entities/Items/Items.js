import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (item, animation) => {
    switch (item) {
        case "HP_POTION": return <LottieView ref={animation} style={styles.item} source={require("../../images/Items/HP_Potion.json")} />
        case "Attack_POTION": return <LottieView ref={animation} style={styles.item} source={require("../../images/Items/Attack_Potion.json")} />
        case "Defense_POTION": return <LottieView ref={animation} style={styles.item} source={require("../../images/Items/Defense_Potion.json")} />
        case "Dynamite": return <LottieView ref={animation} style={styles.item} source={require("../../images/Items/Dynamite.json")} />
    }
}

const styles = StyleSheet.create({
    item: {
      height: "100%",
      width: "100%",
    },
  });