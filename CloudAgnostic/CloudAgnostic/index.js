// dependencies
var provider = 'aws';
var Provider = require('./storage/' + provider + '/provider');
var Storage = require('./storage/' + provider + '/storage');

exports.handler = function (event, context, callback) {
    console.info(event);
    Provider.printProvider("Hello World");
    Storage.saveObject(event, '1');
}

