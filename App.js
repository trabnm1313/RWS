import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Button } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './assets/entities';
import GameLoop from './assets/systems/GameLoop'
import eventHandler from './assets/systems/eventHandler'

const Something = (props) => {
  console.log(props)
  return (<Text>{props.value}</Text>)
}

export default function App() {
  const engine = useRef(null)

  return (
    <View style={styles.container}>
      <Button>Click</Button>
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
