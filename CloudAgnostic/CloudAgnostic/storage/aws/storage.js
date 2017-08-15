// dependencies
var AWS = require('aws-sdk');
var S3 = new AWS.S3();
var BucketName = 'poc-cloudagnostic-maddie';

module.exports = {
    saveObject: function(message, messageId) {
        console.log('Message: ' + JSON.stringify(message));

        // upload the message to S3
        S3.putObject({
            Bucket: BucketName,
            Key: messageId,
            Body: JSON.stringify(message)
        }, function (err) {
            if (err) {
                console.error('Error: ' + err);
            } else {
                console.log('Success');
            }
        });
    }
}