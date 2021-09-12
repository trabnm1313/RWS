import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View , TouchableOpacity, Button } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Constants  from './Constants'

//Entities
import entities from './assets/entities'

//Systems
import GameLoop from './assets/systems/GameLoop'
import eventHandler from './assets/systems/eventHandler'

import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import * as SQLite from 'expo-sqlite'


//Sample of how to get data from transaction to use
const Data = () => {
  console.log("Button clicked, wait for response...")

  //Making promise
  return new Promise((resolve, reject) =>  {

    //Create connection to database
    const db = SQLite.openDatabase("dictionaries.db")

    //Making transaction
    db.transaction(tx => {

      tx.executeSql("SELECT * FROM entries WHERE word = 'Abada'", [], (_, res) => {
        //Send it to resolve
        resolve(res)
      },
      (_, err) => console.log(err))

    })
  })
  
}

const initialDatabase = async () => {
  //Get information of directory & database from android app through FileSystem
  const directoryInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory+"SQLite")
  const databaseInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory+"SQLite/dictionaries.db")

  //If SQLite(default database directory) isn't exists then create one
  if ( !directoryInfo.exists ){
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite").then(()=>console.log("Created SQLite directory.")).catch(err=>console.log(err))
  }else{
    //Log current directory infomation
    console.log("SQLite Directory Exists: ", directoryInfo)

    //If database isn't exists then create one
    if( !databaseInfo.exists ){
      const [{ uri }] = await Asset.loadAsync(require("./assets/dictionary.db")) //GET local database file URI
      //Download local database into SQLite directory in android app
      await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + "SQLite/dictionaries.db").then(() => console.log("Database loaded.")).catch(()=>console.log(err))
    }else{
      //Log current database in SQLite folder
      console.log(databaseInfo)
    }
    
  }


}

//Making database directory & database if there are none
initialDatabase()


//Debugging

let gameStage = "onField"

export default function App() {
  const engine = useRef(null)

  return (
    <View style={styles.container}>
      {/* This button is a sample of query data where "word = Abada" */}
      {/* we can use .then instead of async/await */}
      <Button color='green' title="HelloWorld" onPress={async () => {console.log(await Data())}}></Button>

      {/* GameEngine does interrupt other interaction within <View> */}
      {/* we can initialDatabase in App.js and then using SQLite.openDatabase() in any file needed */}
      
      {/* <GameEngine
      ref={engine}
      style={{ position: "absolute", top:0, bottom:0, left:0, right:0 }}
      entities = {entities(engine, gameStage)}
      systems={[GameLoop]}
      onEvent={eventHandler}>
      </GameEngine> */}
      
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
