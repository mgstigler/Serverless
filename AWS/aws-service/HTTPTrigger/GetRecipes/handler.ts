'use strict';
import { RecipeModel } from "../Shared/recipeModel"
import * as AWS from "aws-sdk";

module.exports.GetRecipes = (event: RecipeModel, context, callback) => {
    console.info("Received event: ", JSON.stringify(event, null, 2));
    let docClient = new AWS.DynamoDB.DocumentClient()

    let table = process.env.TABLE_NAME;

    let response = {
        statusCode: 200,
        message: []
    };

    let params = {
        TableName: table,
        ProjectionExpression: "#id, #m, #d, #pt",
        ExpressionAttributeNames: {
            "#id": "Id",
            "#m": "Meal",
            "#d": "Description",
            "#pt": "PrepTime"
        }
    };

    console.log("Scanning Recipes.");
    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            response.statusCode = 500;
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, response);
        } else if (data == null) {
            response.statusCode = 404;
            callback(null, response);
        }else {
            console.log("Scan succeeded.");
            data.Items.forEach(function(recipe) {
                response.message.push(recipe);
            });
            
            callback(null, response);
        }
    }

};
