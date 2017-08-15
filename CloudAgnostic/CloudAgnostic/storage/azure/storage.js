// dependencies
var azure = require('azure-storage');
var blobClient = azure.createBlobService();
var containerName = 'poc-cloudagnostic';

module.exports = {
    saveObject: function(message, messageId) {
        console.log('Message: ' + message);
        message = JSON.stringify(message);
        blobClient.createBlockBlobFromText(containerName, messageId, message, function(error, result, response) {
            if(error) {
                console.log("Couldn't upload");
                console.error(error);
            } else {
                console.log("Upload successful!");
            }
        })
    }
}