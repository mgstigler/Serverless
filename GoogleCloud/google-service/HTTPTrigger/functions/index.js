'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({origin: true});
const storageModule = require('./storage');


exports.alerts = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
    let alert = req.query.alert;
    let roomnumber = req.query.roomNumber;
    let phoneNumber = req.query.phoneNumber;
    let name = req.query.name;
    console.log("alert " + alert + " room " + roomnumber);
    if (!alert) {
      alert = req.body.alert;
      roomnumber = req.body.roomNumber;
      phoneNumber = req.body.phoneNumber;
      name = req.body.name;  
    }
    admin.database().ref('/alerts').push({alert: alert, roomnumber:roomnumber, phoneNumber: phoneNumber, name: name}).then(snapshot => {
    });
    res.status(200).send(`<!doctype html>
    <head>
      <title>Incoming Request</title>
    </head>
    <body>
      Request: ${alert}
      </br>
      RoomNumber: ${roomnumber}
    </body>
  </html>`);
  });
});

exports.sendAlert = functions.database.ref('/alerts/{pushId}').onWrite(storageModule.handler);
