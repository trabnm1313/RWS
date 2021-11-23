import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

export default (props) => {
    let letter = props.word

    switch (letter) {
        case "A": return <Image style={styles.button} source={require("../Alphabet/A.png")} />
        case "B": return <Image style={styles.button} source={require("../Alphabet/B.png")} />
        case "C": return <Image style={styles.button} source={require("../Alphabet/C.png")} />
        case "D": return <Image style={styles.button} source={require("../Alphabet/D.png")} />
        case "E": return <Image style={styles.button} source={require("../Alphabet/E.png")} />
        case "F": return <Image style={styles.button} source={require("../Alphabet/F.png")} />
        case "G": return <Image style={styles.button} source={require("../Alphabet/G.png")} />
        case "H": return <Image style={styles.button} source={require("../Alphabet/H.png")} />
        case "I": return <Image style={styles.button} source={require("../Alphabet/I.png")} />
        case "J": return <Image style={styles.button} source={require("../Alphabet/J.png")} />
        case "K": return <Image style={styles.button} source={require("../Alphabet/K.png")} />
        case "L": return <Image style={styles.button} source={require("../Alphabet/L.png")} />
        case "M": return <Image style={styles.button} source={require("../Alphabet/M.png")} />
        case "N": return <Image style={styles.button} source={require("../Alphabet/N.png")} />
        case "O": return <Image style={styles.button} source={require("../Alphabet/O.png")} />
        case "P": return <Image style={styles.button} source={require("../Alphabet/P.png")} />
        case "Q": return <Image style={styles.button} source={require("../Alphabet/Q.png")} />
        case "R": return <Image style={styles.button} source={require("../Alphabet/R.png")} />
        case "S": return <Image style={styles.button} source={require("../Alphabet/S.png")} />
        case "T": return <Image style={styles.button} source={require("../Alphabet/T.png")} />
        case "U": return <Image style={styles.button} source={require("../Alphabet/U.png")} />
        case "V": return <Image style={styles.button} source={require("../Alphabet/V.png")} />
        case "W": return <Image style={styles.button} source={require("../Alphabet/W.png")} />
        case "X": return <Image style={styles.button} source={require("../Alphabet/X.png")} />
        case "Y": return <Image style={styles.button} source={require("../Alphabet/Y.png")} />
        case "Z": return <Image style={styles.button} source={require("../Alphabet/Z.png")} />
    }
}

const styles = StyleSheet.create({
    button: {
      height: 50,
      width: 50,
    },
  });