import { Image, StyleSheet } from "react-native";
import React from "react"

export default (letter) => {

    switch (letter) {
        case "A": return <Image style={styles.button} source={require("../../images/Alphabet/A.png")} />
        case "B": return <Image style={styles.button} source={require("../../images/Alphabet/B.png")} />
        case "C": return <Image style={styles.button} source={require("../../images/Alphabet/C.png")} />
        case "D": return <Image style={styles.button} source={require("../../images/Alphabet/D.png")} />
        case "E": return <Image style={styles.button} source={require("../../images/Alphabet/E.png")} />
        case "F": return <Image style={styles.button} source={require("../../images/Alphabet/F.png")} />
        case "G": return <Image style={styles.button} source={require("../../images/Alphabet/G.png")} />
        case "H": return <Image style={styles.button} source={require("../../images/Alphabet/H.png")} />
        case "I": return <Image style={styles.button} source={require("../../images/Alphabet/I.png")} />
        case "J": return <Image style={styles.button} source={require("../../images/Alphabet/J.png")} />
        case "K": return <Image style={styles.button} source={require("../../images/Alphabet/K.png")} />
        case "L": return <Image style={styles.button} source={require("../../images/Alphabet/L.png")} />
        case "M": return <Image style={styles.button} source={require("../../images/Alphabet/M.png")} />
        case "N": return <Image style={styles.button} source={require("../../images/Alphabet/N.png")} />
        case "O": return <Image style={styles.button} source={require("../../images/Alphabet/O.png")} />
        case "P": return <Image style={styles.button} source={require("../../images/Alphabet/P.png")} />
        case "Q": return <Image style={styles.button} source={require("../../images/Alphabet/Q.png")} />
        case "R": return <Image style={styles.button} source={require("../../images/Alphabet/R.png")} />
        case "S": return <Image style={styles.button} source={require("../../images/Alphabet/S.png")} />
        case "T": return <Image style={styles.button} source={require("../../images/Alphabet/T.png")} />
        case "U": return <Image style={styles.button} source={require("../../images/Alphabet/U.png")} />
        case "V": return <Image style={styles.button} source={require("../../images/Alphabet/V.png")} />
        case "W": return <Image style={styles.button} source={require("../../images/Alphabet/W.png")} />
        case "X": return <Image style={styles.button} source={require("../../images/Alphabet/X.png")} />
        case "Y": return <Image style={styles.button} source={require("../../images/Alphabet/Y.png")} />
        case "Z": return <Image style={styles.button} source={require("../../images/Alphabet/Z.png")} />
    }
}

const styles = StyleSheet.create({
    button: {
      height: "100%",
      width: "100%",
    },
  });