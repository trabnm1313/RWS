import { Image, StyleSheet } from "react-native";
import React from "react"
import LottieView from 'lottie-react-native'

export default (item, animation) => {
    switch (item) {
        case "HP_POTION": return <Image style={styles.item} source={require("../../images/Items/HP_Potion.png")} />
    }
}

const styles = StyleSheet.create({
    item: {
      height: "100%",
      width: "100%",
    },
  });