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

  async function test(txt) {
    onChangeText(txt)
    console.log(await findWord(text))
  }

  let [text, onChangeText] = useState("");
  // Open database

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(i) => test(i)}
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
