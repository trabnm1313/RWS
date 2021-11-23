import jsonData from '../entries.json'

let Data = null
let loadStatus = false

function openDatabase(){
    Data = jsonData
    loadStatus = true
}

export {
  openDatabase,
  Data,
  loadStatus
}