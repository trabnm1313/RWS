import * as SQLite from "expo-sqlite";

//Sample of how to get data from transaction to use

export default async () => {

  // Random number in range (min, max) -> getRndInteger(0, 10) = random number between 0 -> 10
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Make random number to Letter A-Z
  function makeChar() {
    return String.fromCharCode(getRndInteger(65, 90));
  }

  // Get word via first character
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

  let Word = [];
  let result = [];
  let total = 0;

  // Get first word
  let gotWord = await getWordSpecifyChar(makeChar() + "%");

  // Random extract Word from SQL Array
  let theWord = gotWord.rows._array[getRndInteger(0, gotWord.rows._array.length)].word;

  // Total length tell that how many space left
  total += theWord.length;

  // Push that word into array of word
  Word.push(theWord)

  // Get other word and push it in array until array have 15 letter
  // The array gonna looks like this => array = [ "first_word (from lines 61 -> 71)", "second (in-process below)", "third (in-process below)"]
  while (total < 18) {
    gotWord = await getWordSpecifyChar(makeChar() + "%")

    if (gotWord.rows._array.length === 0) {
     continue
    } else {
      theWord = gotWord.rows._array[getRndInteger(0, gotWord.rows._array.length)].word;
      total += theWord.length;
      Word.push(theWord)
    }
  }

  // split the word to letter array => ["L", "O", "V", "E"]
  Word.map((each) => {
    let spilter = each.split('');
    spilter.map((letter) => {
      result.push(letter.toUpperCase())
    })
  })

  // delete the overflow letter
  if (result.length > 18) {
    result.splice(18, result.length - 18)
  }

  // shuffle element in array
  final_result = result.sort(() => Math.random() - 0.5)

  return final_result
};