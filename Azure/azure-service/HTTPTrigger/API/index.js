var client = require('twilio')(process.env.TwilioAccountSid, process.env.TwilioAuthToken);

module.exports = function (context, req) {
    console.log(req.body.name);
    if(req.body.name && req.body.phoneNumber){
        client.messages.create({
            from: '+18178544390',
            to: req.body.phoneNumber,
            body: "Hello " + req.body.name + "! Your order of " + req.body.order + " is on the way."
        }, function(err, message) {
            if(err) {
                console.error(err.message);
            }
        });
    }

    else {
        console.error("Please include a request body with a name and a phone number");
    }
};
