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
import findWord from "./systems/findWord";

export default function App() {
  const [wordArray, setWordArray] = useState([]);
  const [inputArray, setInputArray] = useState([])

  // Mounting database
  useEffect(() => {
    opendatabase()
    changeScreenOrientation()
  })
  
  // screen orient
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  // Call genword
  async function generate() {
    setWordArray(await genWord())
  }

  function addWordInput(word) {
    let x = [...inputArray];
    x.push(word);
    setInputArray(x)
  }

  function clearWordInput(wantToclear) {
    if (wantToclear) {
      setInputArray([])
    }
  }

  async function handleChange(txt) {
    let gonnaCheck = txt.join("")
    let isWord = await findWord(gonnaCheck);
    if (isWord == 0) {
      console.log("No word in database")
    } else console.log(gonnaCheck + " is a word.")
  }

  return (
    <View style={styles.container}>
      <Button title="Check" onPress={() => {handleChange(inputArray)}} />
      <WordInput inputArray={inputArray} wantToClear={clearWordInput} />
      <WordTable handler={addWordInput} wordArray={wordArray} />
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
