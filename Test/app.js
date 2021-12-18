import express from  'express';
import line from '@line/bot-sdk';
import path from 'path';
import {addUser, getData,} from './database.js'
import dotenv from 'dotenv';
import axios from 'axios';
import mqtt from 'mqtt';
// import {predict} from './tensorflow/load.js'
// import ngrok from 'ngrok';
import cron from 'node-cron'
import bodyParser from 'body-parser'

let payloads = {}
const __dirname = path.resolve();
const app = express();
app.use(express.urlencoded({
  extended: true
}));
dotenv.config()
let jsonParser = bodyParser.json()

// const lineConfig = {
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.CHANNEL_SECRET,
// };
// const lineClient = new line.Client(lineConfig);


// var mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
// mqttClient.on('connect', () => {
//   mqttClient.subscribe(['mumu_466/sensors/cucumber/#'], () => {
//   });
// });

// mqttClient.on('message', (topic, payload) => {
//   // console.log('Received Message:', topic, payload.toString())
//   payloads = JSON.parse(payload.toString());
// });

// cron.schedule('0 0 7 * * *', async () => {
//   const data = await getData('/users')
//   let pred = 'unpredictable'
//   try {
//     // pred = await predict([payloads.humidity,payloads.pressure])
//   } catch(err) {
//     console.error(err)
//   }
//   let echo = {type: 'text', text: `อุณหภูมิ ${payloads.temperature} 
//   ความชื้น ${payloads.humidity}
//   ความดัน ${payloads.pressure}
//   ผลทำนายวันนี้ ${pred}
//   ณ วันที่ ${await new Date().toLocaleString( 'th-TH', { timeZone: 'Asia/Bangkok' }).slice(0, 10).replace('T', ' ')}` };
//   const idAll = Object.keys(data).map((res) => { return data[res].id; })
//   await axios.post(`https://api.line.me/v2/bot/message/multicast`, {
//         'to': idAll,
//         'messages':[echo]
//         }, {
//             headers: {
//               'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
//               'Content-Type': 'application/json'
//             }
//           })

// });


app.get("/location", (req, res) => {
   res.sendFile(path.join(__dirname+'/templates/getLocation.html'));
});

app.get("/tf" ,(req, res) => {
  res.sendFile(path.join(__dirname+'/templates/ML_Classifier.html'))
})

app.get("/training.csv" ,(req, res) => {
  res.sendFile(path.join(__dirname+'/training.csv'))
})

app.get("/testing.csv" ,(req, res) => {
  res.sendFile(path.join(__dirname+'/testing.csv'))
})

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname+'/templates/register.html'));
});


app.post("/getdata", jsonParser, async (req,res) => {
  console.log('getdata')
  await addUser({
    id: req.body.id,
    name: req.body.name
  })
  .then(() => {
    axios.post(`https://api.line.me/v2/bot/user/${req.body.id}/richmenu/richmenu-c924d028a05b2c67a4dc937f2aa1a74e`, {
      'richMenuId': 'richmenu-c924d028a05b2c67a4dc937f2aa1a74e'
  }, {
      headers: {
        'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      }
    }).then(() => {
      res.status(200)
      res.send('สำเร็จ')
    }).catch((err) =>{
      console.error
      res.status(500)
      res.send('มีข้อผิดพลาด การเปลี่ยนแปลง rich menu')
    })
  })
  .catch((err) =>{
    console.error
    res.status(501)
    res.send('มีข้อผิดพลาด การเพิ่มข้อมูล')
  })
})

// app.post('/callback', line.middleware(lineConfig), (req, res) => {
//   console.log('callback')
//     if (req.body.destination) {
//         console.log("Destination User ID: " + req.body.destination);
//     }
    
//     // req.body.events should be an array of events
//     if (!Array.isArray(req.body.events)) {
//         return res.status(500).end();
//     }

//     // handle events separately 
//     Promise
//         .all(req.body.events.map(handleEvent))
//         .then((result) => res.json(result))
//         .catch((err) => {
//             console.log("error jaaaaaaaa");
//             console.error(err);
//             res.status(500).end();
//         });
// });



// async function handleEvent(event) {
//     console.log(event.message);
//     console.log(event);
//     let echo
//     if (event.type !== 'message') {
//         // ignore non-text-message event
//         return Promise.resolve(null);
//     } else if (event.type === 'message' && event.message.text === 'atHome') {
//       let pred = 'unpredictable'
//         try {
//           pred = await predict([payloads.humidity,payloads.pressure])
//         } catch(err) {
//           console.error(err)
//         }
//       echo = [
//         { type: 'text', text: `อุณหภูมิ ${payloads.temperature}\nความชื้น ${payloads.humidity}\nความดัน ${payloads.pressure}\nผลทำนาย ${pred} \n ณ เวลา ${await new Date().toLocaleString( 'th-TH', { timeZone: 'Asia/Bangkok' }).slice(0, 19).replace('T', ' ')}` }
//       ]; }
//     else{
//       console.log(`test`)
//       echo = [
//         { type: 'text', text: 'กรุณาสอบถามข้อมูลใหม่อีกรอบ'}
//         ];
//     }
//     return lineClient.replyMessage(event.replyToken, echo); 
// }

const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   // const url = await ngrok.connect(port);
//   console.log("listening on port 3001...");
//   // lineClient.setWebhookEndpointUrl(`${url}/callback`)
//   // console.log(url)
// });

export default app