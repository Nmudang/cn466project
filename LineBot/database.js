// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { uid } from 'uid';
import { getDatabase, ref, set, child, get ,goOnline, goOffline} from "firebase/database";
import {createObjectCsvWriter} from 'csv-writer'
import fs from 'fs'
// const fs = require('fs')

const firebaseConfig = {
  apiKey: "AIzaSyC1o3nWt16dZDXNqSTWikuLUuegz7Ms40E",
  authDomain: "project466final.firebaseapp.com",
  projectId: "project466final",
  storageBucket: "project466final.appspot.com",
  messagingSenderId: "621276246018",
  appId: "1:621276246018:web:7c14b485793f2c2dd2b71b",
  measurementId: "G-Y03TDZ6QTM",
  databaseURL: "https://project466final-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

async function addUser(data) {
  const db = getDatabase(app);
  console.log(data)
  goOnline(db)
  const result = await set(ref(db, `users/${uid(32)}`), {
    id:data.id,
    name: data.name
  }).then(() => {
    goOffline(db);
  })
}

function addTemp(data) {
  // console.log(data)
  const db = getDatabase(app);
  goOnline(db)
  set(ref(db, `temps/${uid(32)}`), {
    label:data.label,
    humidity: data.humidity,
    temperature: data.temperature
  }).then(() => {
    goOffline(db);
  });
}

async function getData(refs) {
  const dbRef = ref(getDatabase());
  let results = await get(child(dbRef, `/${refs}`)).then((snapshot) => {
      if (snapshot.exists()) {
      return snapshot.val();
      } else {
      console.log("No data available");
      }
  })
  .then((res) => {
    return res
  })
  .catch((error) => {
      console.error(error);
  });
  return results
}

function writeFilTxt(results) {
  console.log(results)
  let data = `${JSON.stringify(results)} \n`
    if (fs.existsSync('data.txt')) {
        fs.appendFile('data.txt', data, (err) => {
            if (err) throw err;
        })
    } else {
        fs.writeFile('data.txt', data, (err) => {
            if (err) throw err;
        })
    }
}
export { 
  addUser,
  addTemp,
  getData,
  writeFilTxt
};