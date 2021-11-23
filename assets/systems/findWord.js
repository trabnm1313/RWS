import * as SQLite from "expo-sqlite";
import { Data } from './opendatabase'

//Sample of how to get data from transaction to use
//return 0, 1 0 = no word found, 1 = word found

export default (text) => {
  // make text lowercase
  let txt = text.toLowerCase()
  // capitalize the first letter to match the word in database
  let word = txt.charAt(0).toUpperCase() + txt.slice(1)

  return Data.filter(wordInData => { return wordInData.word == word }).length
  
  // //Making promise
  // return new Promise((resolve, reject) => {
  //   //Create connection to database
  //   const db = SQLite.openDatabase("dictionary.db");

  //   //Making transaction
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM entries WHERE word = ?", [word],
  //       (_, res) => {
  //         //Send it to resolve
  //         resolve(res.rows.length);
  //       },
  //       (_, err) => console.log(err)
  //     );
  //   });
  // });

};
