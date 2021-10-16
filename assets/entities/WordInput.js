import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import Word from "./Word";

export default (props) => {
  const [array, setArray] = useState([]);

  let rendered = array.map((element) => {
    return <Word word={element} />;
  });

  function Add() {
    let x = [...array];
    x.push("A");
    setArray(x);
  }

  return (
    <>
      <Button title="Add" onPress={() => Add()} />
      <View style={{ padding: 20, flexDirection: 'row' }}>{rendered}</View>
    </>
  );
};

const styles = StyleSheet.create({
  wordinput: {
    padding: 20,
  },
});
