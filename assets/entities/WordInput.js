import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import Word from "./Word";

export default (props) => {
  // receive inputArray
  let array = props.inputArray

  let rendered = array.map((element, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => {callForClear()}}>
        <Word word={element} />
      </TouchableOpacity>
    )
  });


  // call to parent to reset inputArray
  function callForClear() {
    props.wantToClear(true)
  }

  return (
    <>
      <View style={{ padding: 20, flexDirection: 'row' }}>{rendered}</View>
    </>
  );
};
