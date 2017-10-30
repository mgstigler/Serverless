var AWS = require('aws-sdk');
exports.handler = (event, context, callback) => {
    var myProvider = process.env.provider;
    callback(null, "The cloud provider for this demo is: " + myProvider + ".  The event received is: " + JSON.stringify(event));
};