import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import opendatabase from "./systems/opendatabase";
import findWord from "./systems/findWord";

export default function App() {

  useEffect(() => {
    opendatabase();
  }) 

  async function handleChange(txt) {
    setText(txt)
    let isWord = await findWord(txt);
    if (isWord == 0) {
      console.log("No word in database")
    } else console.log(txt + " is a word.")
  }

  let [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(i) => handleChange(i)}
        value={text}
      />
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
