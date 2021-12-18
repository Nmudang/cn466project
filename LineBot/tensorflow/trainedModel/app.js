
import line from '@line/bot-sdk';
import ngrok from 'ngrok';
import express from 'express';
import axios from 'axios';
import mqtt from 'mqtt';
import dotenv from 'dotenv';
dotenv.config()
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDoc ,doc, setDoc} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwymRc-CxX53AkPVDNh1MpG5MfaIrkEMg",
  authDomain: "backache-8099c.firebaseapp.com",
  projectId: "backache-8099c",
  storageBucket: "backache-8099c.appspot.com",
  messagingSenderId: "1056971717520",
  appId: "1:1056971717520:web:27cde6b67ea1c78d6f5115",
  measurementId: "G-RJCFLYGPWH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); 
const db = getFirestore(); 
async function  set(nameCollection,nameDocument, data) { 
  try {          
   await setDoc(doc(db, nameCollection, nameDocument), data);                 
      console.log("Document written with ID: ", nameDocument);        
  } 
  catch (e) {      
      console.error("Error adding document: ", e); 
  } 
}

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

//console.log(config);
const client = new line.Client(config);
const app = express();

let payloads = {'text' : 'text'};
var mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

// เชื่อมต่อ
mqttClient.on('connect', () => {
     console.log('connected')
     mqttClient.subscribe(['cn466/natthaporn/backache/#'], () => {
         console.log("Topic subscribed")
    });
});

//การรับค่า
let startTime = "";
let endTime = "";
var today = new Date();
var newTime = "";


mqttClient.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    payloads = JSON.parse(payload.toString());
    if(payloads.newStatus == "walking"){
      startTime = today.getTime();
      console.log("Todayyy  => "+ startTime);
    }
    if(payloads.newStatus == "sleeping"){
      endTime = today.getTime();
      //calculate time
      var distance = endTime - startTime;
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      newTime = hours + minutes;
      console.log("take time => "+ newTime + " distance => "+distance);

      calcuTime(newTime)
      
      //calculate new time 
      
      //const dbRef = db.collection("Data").doc(date);
      //calcuTime(newTime);
      
    }
    console.log("Status : " + payloads.newStatus);
});

app.post('/callback', line.middleware(config), (req, res) => {
    if (req.body.destination) {
        console.log("Destination User ID: " + req.body.destination);
    }
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.log("error jaaaaaaaaaaaaaaaaaaaaaaa")
        console.error(err);
        res.status(500).end();
    });
});

async function calcuTime(newTime){
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      const Ref = db.collection('Data').doc(date);
      const doc = await Ref.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }

}

async function handleEvent(event) {
   
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }

    let text = event.message.text   
    let newStatus = { type: 'text', text: payloads.newStatus};   
    if( text == 'setDate'){
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      set("Data" , date ,{"TotalTime": time});
    }
    return client.replyMessage(event.replyToken, newStatus); 
}

// initialization
async function initServices() {
    const baseURL = await ngrok.connect(port);
    console.log('Set LINE webhook at ' + baseURL + '/callback');
    await client.setWebhookEndpointUrl(baseURL + '/callback');
}

const port = process.env.PORT || 3000;
async function start_ngrok() {    
    const url = await ngrok.connect(port);
    await client.setWebhookEndpointUrl(url + '/callback');
    console.log(url);
}

start_ngrok();
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// LIFF UI
app.use(express.static('static'));
