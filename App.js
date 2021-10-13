import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
// import opendatabase from "./systems/opendatabase";
// import genWord from "./systems/genWord";
// import findWord from "./systems/findWord";

export default function App() {
  // TextInput state
  // let [text, setText] = useState("");

  // Mounting database
  useEffect(() => {
    // opendatabase();
    changeScreenOrientation()
  }) 

  // Call genword
  // async function generate() {
  //   await genWord()
  // }

  // Handle change in Text input
  // async function handleChange(txt) {
  //   setText(txt)
  //   let isWord = await findWord(txt);
  //   if (isWord == 0) {
  //     console.log("No word in database")
  //   } else console.log(txt + " is a word.")
  // }

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
