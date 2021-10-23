import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View , TouchableOpacity, LogBox, Platform, Dimensions, Image } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import * as ScreenOrientation from "expo-screen-orientation"

import Constants  from './Constants'

//Entities
import loadingScreen from './assets/loadingScreen'
import {generator} from './assets/generator'

//Systems
import GameLoop from './assets/systems/GameLoop'
import eventHandler from './assets/systems/eventHandler'
import { openDatabase, loadStatus } from './assets/systems/opendatabase'
import Loading from './assets/systems/Loading'

//Debugging
LogBox.ignoreLogs(['Remote debugger']);

let gameStage = "onField"

export default function App() {
  const engine = useRef(null)

  // Mounting database
  useEffect(() => {
    openDatabase()
    changeScreenOrientation()
  })
  
  // screen orient
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  return (
    <View style={styles.container}>
      <Image style={{left:0, top:0, width: 800, height: 375, position: 'absolute'}} source={require("./assets/images/Battlefield.png")}/>
      <GameEngine
      ref={engine}
      style={{ position: "absolute", top:0, bottom:0, left:0, right:0 }}
      entities={loadingScreen(engine)}
      systems={[GameLoop, Loading]}
      onEvent={eventHandler}>
      </GameEngine>
      <StatusBar style="auto" hidden/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
