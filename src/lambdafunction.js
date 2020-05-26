// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async(event, context, callback) => {

    
    /* 
     *i am aware that this is not the optimal way to get query string
     *parameters but i am pressed for time so just assuming an ordering
     *for now
    */ 

    var body = decodeURIComponent(event.body);
    var bodyparams = body.split("&");
    var name = bodyparams[0].split("=")[1];
    var email = bodyparams[1].split("=")[1];
    var message = bodyparams[2].split("=")[1];
    
    var params = {
      TableName: "Email",
      Item: {
        'Id': {N: '1'},
        'Name' : {S: name},
        'Email' : {S: email},
        'Message' : {S: message}
      }
    };
    
  
    // Call DynamoDB to add the item to the table
    var promise = ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        throw (err);
      } else {
        console.log("Success", data);
      }
    }).promise(); 

var response = '';    
    
promise.then(
  
  function(data) {
    
  let response = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST"            
        },
        body: JSON.stringify(body)
    };    
    
    callback(null, response);
    
  },
  function(error) {
    /* handle the error */
  }
);    
    

  
return promise;  
   
        
};



