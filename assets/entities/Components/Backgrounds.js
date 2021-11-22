import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (background) => {
    switch (background) {
        case "Menu": return <Image style={styles.button} source={require("../../images/Battlefield2.png")}/>
        case "Battle": return <Image style={styles.button} source={require("../../images/Battlefield.png")}/>
    }
}

const styles = StyleSheet.create({
    button: {
      height: "100%",
      width: "100%",
    },
  });