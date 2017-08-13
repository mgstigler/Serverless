'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.handler = (event) => {
    const accountSid = functions.config().twilioservice.accountsid;
    const authToken = functions.config().twilioservice.authtoken;
    const client = require('twilio')(accountSid, authToken);

    var alert = event.data.val();
    console.log("Alert " + JSON.stringify(alert));
    var number = alert.phoneNumber;
    var name = alert.name;
    var room = alert.roomnumber;
    client.messages.create({
        from: '+18178544390',
        to: number,
        body: "Hello " + name + "! Your request is on the way to room " + room +"."
    }, function(err, message) {
        if(err) {
            console.error(err.message);
        }
    });

    return event.data.ref.parent.child('alertSent').set("alert has been sent");

};


