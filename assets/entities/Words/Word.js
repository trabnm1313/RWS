import { Image, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native'
import React from "react"

export default (item, animation) => {

    switch (item) {
        case "A": return <LottieView ref={animation} source={require("../../images/Alphabet/A.json")}></LottieView>
        case "B": return <LottieView ref={animation} source={require("../../images/Alphabet/B.json")}></LottieView>
        case "C": return <LottieView ref={animation} source={require("../../images/Alphabet/C.json")}></LottieView>
        case "D": return <LottieView ref={animation} source={require("../../images/Alphabet/D.json")}></LottieView>
        case "E": return <LottieView ref={animation} source={require("../../images/Alphabet/E.json")}></LottieView>
        case "F": return <LottieView ref={animation} source={require("../../images/Alphabet/F.json")}></LottieView>
        case "G": return <LottieView ref={animation} source={require("../../images/Alphabet/G.json")}></LottieView>
        case "H": return <LottieView ref={animation} source={require("../../images/Alphabet/H.json")}></LottieView>
        case "I": return <LottieView ref={animation} source={require("../../images/Alphabet/I.json")}></LottieView>
        case "J": return <LottieView ref={animation} source={require("../../images/Alphabet/J.json")}></LottieView>
        case "K": return <LottieView ref={animation} source={require("../../images/Alphabet/K.json")}></LottieView>
        case "L": return <LottieView ref={animation} source={require("../../images/Alphabet/L.json")}></LottieView>
        case "M": return <LottieView ref={animation} source={require("../../images/Alphabet/M.json")}></LottieView>
        case "N": return <LottieView ref={animation} source={require("../../images/Alphabet/N.json")}></LottieView>
        case "O": return <LottieView ref={animation} source={require("../../images/Alphabet/O.json")}></LottieView>
        case "P": return <LottieView ref={animation} source={require("../../images/Alphabet/P.json")}></LottieView>
        case "Q": return <LottieView ref={animation} source={require("../../images/Alphabet/Q.json")}></LottieView>
        case "R": return <LottieView ref={animation} source={require("../../images/Alphabet/R.json")}></LottieView>
        case "S": return <LottieView ref={animation} source={require("../../images/Alphabet/S.json")}></LottieView>
        case "T": return <LottieView ref={animation} source={require("../../images/Alphabet/T.json")}></LottieView>
        case "U": return <LottieView ref={animation} source={require("../../images/Alphabet/U.json")}></LottieView>
        case "V": return <LottieView ref={animation} source={require("../../images/Alphabet/V.json")}></LottieView>
        case "W": return <LottieView ref={animation} source={require("../../images/Alphabet/W.json")}></LottieView>
        case "X": return <LottieView ref={animation} source={require("../../images/Alphabet/X.json")}></LottieView>
        case "Y": return <LottieView ref={animation} source={require("../../images/Alphabet/Y.json")}></LottieView>
        case "Z": return <LottieView ref={animation} source={require("../../images/Alphabet/Z.json")}></LottieView>
    }
}

const styles = StyleSheet.create({
    button: {
      height: "100%",
      width: "100%",
    },
  });