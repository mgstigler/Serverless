'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.subscribe = functions.pubsub.topic('AlertService').onPublish(event => {
    const pubSubMessage = event.data;
    // Get the `name` attribute of the PubSub message JSON body.
    let alert = null;
    try {
      alert = pubSubMessage.json.alert;
      console.log("Alert: " + alert);
      admin.database().ref('/alerts').push({alert: alert}).then(snapshot => {
        console.log("success!");
      });

    } catch (e) {
      console.error('PubSub message was not JSON', e);
    }
});
