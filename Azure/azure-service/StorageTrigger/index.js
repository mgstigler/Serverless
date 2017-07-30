var request=require('request');

module.exports = function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    if(myQueueItem.name && myQueueItem.order && myQueueItem.phoneNumber) {

        var options = {
            url: 'https://beginningServerless.azurewebsites.net/api/orders/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: myQueueItem
        };

        request(options, function(err, res, body) {
            if (res && (res.statusCode === 200 || res.statusCode === 201)) {
            console.log(body);
            }
        });
    }
    else (
        console.log("Nothing to process")
    )

    context.done();
};