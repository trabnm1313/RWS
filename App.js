import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View , TouchableOpacity, LogBox, Platform, Dimensions, Image } from 'react-native'
import LottieView from 'lottie-react-native'
import { GameEngine } from 'react-native-game-engine'
import * as ScreenOrientation from "expo-screen-orientation"

// import Constants  from './Constants'

//Entities
import loadingScreen from './assets/loadingScreen'
// import {generator} from './assets/generator'

//Systems
import GameLoop from './assets/systems/GameLoop'
import Menu from './assets/systems/Menu'
import eventHandler from './assets/systems/eventHandler'
import { openDatabase, loadStatus } from './assets/systems/opendatabase'
import Shop from './assets/systems/Shop'
import Constants from './Constants'

//Debugging
LogBox.ignoreLogs(['Remote debugger']);

export default function App() {
  // const [stage, setStage] = React.useState("Battle")
  const engine = useRef(null)
  openDatabase()

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then(() => {
    if(Constants.MAX_HEIGHT > Constants.MAX_WIDTH){
      let temp = Constants.MAX_HEIGHT
      Constants.MAX_HEIGHT = Constants.MAX_WIDTH
      Constants.MAX_WIDTH = temp
    }
  })

  return (
    <View style={styles.container}>
      <GameEngine
      ref={engine}
      style={{ position: "absolute", top:0, bottom:0, left:0, right:0 }}
      entities={loadingScreen(engine)}
      systems={[GameLoop, Menu, Shop]}
      onEvent={eventHandler}>
      </GameEngine>
      <StatusBar style="auto" hidden/>
    </View>
  )
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
