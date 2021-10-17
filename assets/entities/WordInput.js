import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import Word from "./Word";

export default (props) => {
  const array = props.inputArray

  let rendered = array.map((element, index) => {
    return <Word key={index} word={element} />;
  });

  function Add() {
    
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
