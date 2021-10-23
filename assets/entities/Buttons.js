import { Image, StyleSheet } from "react-native";
import React from "react"

export default (button) => {
    switch (button) {
        case "Start": return <Image style={styles.button} source={require("../images/Components/Start.png")} />
        case "Shop": return <Image style={styles.button} source={require("../images/Components/Shop.png")} />
        case "Confirm": return <Image style={styles.button} source={require("../images/Components/Confirm.png")} />
    }
}

const styles = StyleSheet.create({
    button: {
      height: "100%",
      width: "100%",
    },
  });