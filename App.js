import { StatusBar } from 'expo-status-bar'
import React, { useRef } from 'react'
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Constants  from './Constants'

//Entities
import entities from './assets/entities'

//Systems
import GameLoop from './assets/systems/GameLoop'
import eventHandler from './assets/systems/eventHandler'

//Debugging
console.log(Constants)

let gameStage = "onField"

export default function App() {
  const engine = useRef(null)

  return (
    <View style={styles.container}>
      <GameEngine
      ref={engine}
      style={{ position: "absolute", top:0, bottom:0, left:0, right:0 }}
      entities = {entities(engine, gameStage)}
      systems={[GameLoop]}
      onEvent={eventHandler}>
      </GameEngine>
      <StatusBar style="auto" hidden/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
