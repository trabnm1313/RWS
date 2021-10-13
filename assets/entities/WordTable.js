import React, { useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import Word from "./Word";

export default function WordTable(props) {
  const array = props.wordArray

  function tapHandler(word) {
    console.log(word);
  }

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => tapHandler(array[0])}>
          <Word word={array[0]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[1])}>
          <Word word={array[1]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[2])}>
          <Word word={array[2]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[3])}>
          <Word word={array[3]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[4])}>
          <Word word={array[4]} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => tapHandler(array[5])}>
          <Word word={array[5]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[6])}>
          <Word word={array[6]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[7])}>
          <Word word={array[7]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[8])}>
          <Word word={array[8]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[9])}>
          <Word word={array[9]} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => tapHandler(array[10])}>
          <Word word={array[10]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[11])}>
          <Word word={array[11]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[12])}>
          <Word word={array[12]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[13])}>
          <Word word={array[13]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapHandler(array[14])}>
          <Word word={array[14]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
