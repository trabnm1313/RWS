import * as SQLite from "expo-sqlite";

//Sample of how to get data from transaction to use

export default async (text) => {
  console.log(text)
  console.log("Button clicked, wait for response...");

  //Making promise
  return new Promise((resolve, reject) => {
    //Create connection to database
    const db = SQLite.openDatabase("dictionaries.db");

    //Making transaction
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM entries WHERE word = ?",
        [text],
        (_, res) => {
          //Send it to resolve
          resolve(res);
        },
        (_, err) => console.log(err)
      );
    });
  });
};
