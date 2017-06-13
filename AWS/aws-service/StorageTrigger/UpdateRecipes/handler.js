'use strict';
exports.__esModule = true;
var AWS = require("aws-sdk");
module.exports.UpdateRecipe = function (event, context, callback) {
    console.info("Received event: ", JSON.stringify(event, null, 2));
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = process.env.TABLE_NAME;
    var image = event.Records[0].s3.object.key.split('.');
    var id = parseInt(image[0]);
    // Update the item, unconditionally,
    var params = {
        TableName: table,
        Key: {
            "Id": id
        },
        UpdateExpression: "set ImageURL=:iurl",
        ExpressionAttributeValues: {
            ":iurl": "https://s3.amazonaws.com/recipe-images-ms/" + event.Records[0].s3.object.key
        },
        ReturnValues: "UPDATED_NEW"
    };
    var response = {
        statusCode: 200,
        message: ""
    };
    console.log("Updating the item...");
    docClient.update(params, function (err, data) {
        if (err) {
            response.statusCode = 500;
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            response.message = "Unable to update";
            callback(null, response);
        }
        else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            response.message = "Updated recipe successfully.";
            callback(null, response);
        }
    });
};
