'use strict'
var client = require('twilio')(process.env.TwilioAccountSid, process.env.TwilioAuthToken);
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.handler = (event) => {
    console.log("Event: " + event);
    var alert = event.data.val();
    console.log("Alert " + alert);
    var alert1 = event.data.DeltaSnapshot._delta;
    console.log("Alert " +alert1);

};


// module.exports = function (context, req) {
//     console.log(req.body.name);
//     if(req.body.name && req.body.phoneNumber){
//         client.messages.create({
//             from: '+18178544390',
//             to: req.body.phoneNumber,
//             body: "Hello " + req.body.name + "! Your order of " + req.body.order + " is on the way."
//         }, function(err, message) {
//             if(err) {
//                 console.error(err.message);
//             }
//         });
//     }

//     else {
//         console.error("Please include a request body with a name and a phone number");
//     }
// };


// // [END makeUppercaseTrigger]
//       // [START makeUppercaseBody]
//       // Grab the current value of what was written to the Realtime Database.
//       const original = event.data.val();
//       console.log('Uppercasing', event.params.pushId, original);
//       const uppercase = original.toUpperCase();
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to the Firebase Realtime Database.
//       // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//       return event.data.ref.parent.child('uppercase').set(uppercase);
//       // [END makeUppercaseBody]
//     });