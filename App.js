import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import WordTable from "./assets/entities/WordTable";
import opendatabase from "./systems/opendatabase";
import genWord from "./systems/genWord";
import WordInput from "./assets/entities/WordInput";
// import findWord from "./systems/findWord";

export default function App() {
  const [wordArray, setWordArray] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "O",
    "P",
  ]);

  // Mounting database
  useEffect(() => {
    opendatabase()
    changeScreenOrientation()
  }) 
  
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  // Call genword
  async function generate() {
    setWordArray(await genWord())
  }

  return (
    <View style={styles.container}>
      <WordInput />
      <WordTable wordArray={wordArray} />
      <Button title="Click" onPress={() => generate()}/>
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
