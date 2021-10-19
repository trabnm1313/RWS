import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View , TouchableOpacity, LogBox, Platform, Dimensions } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import * as ScreenOrientation from "expo-screen-orientation"
import Constants  from './Constants'

//Entities
import {generator} from './assets/generator'

//Systems
import GameLoop from './assets/systems/GameLoop'
import eventHandler from './assets/systems/eventHandler'

//Debugging
LogBox.ignoreLogs(['Remote debugger']);

let gameStage = "onField"

export default function App() {
  const engine = useRef(null)

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  }, [])
  
  //Swap Width/Height in-case device is still in landscape mode
  if(Constants.MAX_WIDTH < Constants.MAX_HEIGHT){
    let tempHeight = Constants.MAX_HEIGHT
    Constants.MAX_HEIGHT = Constants.MAX_WIDTH
    Constants.MAX_WIDTH = tempHeight
  }

  return (
    <View style={styles.container}>
      <GameEngine
      ref={engine}
      style={{ position: "absolute", top:0, bottom:0, left:0, right:0 }}
      entities={generator(engine, gameStage)}
      systems={[GameLoop]}
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
