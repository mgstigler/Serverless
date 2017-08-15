// dependencies
var storage = require('@google-cloud/storage');
var gcs = storage({
    projectId: 'loyal-curve-107623',
    keyFilename: '/home/maddie_stigler'
});
var containerName = 'poc-cloudagnostic';


module.exports = {
    saveObject: function(message, messageId) {
        console.log('Message: ' + message);
        gcs.createBucket(containerName, function(err, bucket) {
            //bucket created
            if(!err) {
                var bucket = gcs.bucket(containerName);
                bucket.upload(JSON.stringify(message), function(err, file) {
                    if(!err) {
                        console.log("success");
                    }
                })
            }
        });

    }
}