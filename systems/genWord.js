import * as SQLite from "expo-sqlite";

//Sample of how to get data from transaction to use

export default async () => {
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // make character for like statement
  function makeChar() {
    return String.fromCharCode(getRndInteger(65, 90));
  }

  // get word via first character
  async function getWordSpecifyChar(char) {
    const db = SQLite.openDatabase("dictionaries.db");

    return new Promise((resolve) => {
      //Making transaction
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT word FROM entries where word like ?",
          [char],
          (_, res) => {
            //Send it to resolve
            resolve(res);
          },
          (_, err) => console.log(err)
        );
      });
    });
  }

  async function getWordSpecifyLenght(char, length) {
    const db = SQLite.openDatabase("dictionaries.db");

    return new Promise((resolve) => {
      //Making transaction
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT word FROM entries WHERE word like ? AND LENGTH(word) < ?",
          [char, length],
          (_, res) => {
            //Send it to resolve
            resolve(res);
          },
          (_, err) => console.log(err)
        );
      });
    });
  }

  
  let Word = [];
  let result = [];
  let total = 0;

  // get first word
  let gotWord = await getWordSpecifyChar(makeChar() + "%");
  let theWord = gotWord.rows._array[getRndInteger(0, gotWord.rows._array.length)].word;
  total += theWord.length;
  Word.push(theWord)

  // get other word and push it in array
  // looks like this => array = [ "word", "second", "third"]
  while (total < 15) {
    let leftLength = 7 - total;
    gotWord = await getWordSpecifyLenght(makeChar() + "%", leftLength)

    if (gotWord.rows._array.length === 0) {
     continue
    } else {
      theWord = gotWord.rows._array[getRndInteger(0, gotWord.rows._array.length)].word;
      total += theWord.length;
      Word.push(theWord)
    }
  }

  Word.map((each) => {
    let spilter = each.split('');
    spilter.map((letter) => {
      result.push(letter.toUpperCase())
    })
  })

  if (result.length > 15) {
    result.splice(15, result.length - 15)
  }

  return result
};