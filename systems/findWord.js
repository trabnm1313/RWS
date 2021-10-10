import * as SQLite from "expo-sqlite";

//Sample of how to get data from transaction to use
//return 0, 1 0 = no word found, 1 = word found

export default async (text) => {
  // capitalize the first letter to match the word in database
  let word = text.charAt(0).toUpperCase() + text.slice(1)
  
  //Making promise
  return new Promise((resolve, reject) => {
    //Create connection to database
    const db = SQLite.openDatabase("dictionaries.db");

    //Making transaction
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM entries WHERE word = ?", [word],
        (_, res) => {
          //Send it to resolve
          resolve(res.rows.length);
        },
        (_, err) => console.log(err)
      );
    });
  });
};
