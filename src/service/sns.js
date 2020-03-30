const AWS = require('aws-sdk');
const awsConfig = require('../config/aws');

AWS.config.update(awsConfig);

topics = {
    "EMERGENCY_ALERTS": "arn:aws:sns:us-east-1:005028991903:EMERGENCY_ALERTS"
}

module.exports = {
    publishSns: (topic, message) => {
        const dataMessage = {
            Message: message,
            TopicArn: topics[topic]
        };

        var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(dataMessage).promise();

        publishTextPromise.then(
        function(data) {
            const table = {
                "Region": AWS.config.region,
                "Topic": dataMessage.TopicArn,
                "Message Id": data.MessageId
            };
            console.table(table);
        }).catch(
            function(err) {
            console.error(err, err.stack);
        });    
    },

    createTopicSns: (topic) => {
        var createTopicPromise = new AWS.SNS({apiVersion: '2010-03-31'}).createTopic({Name: topic}).promise();

        createTopicPromise.then(
        function(data) {
            console.log("Topic ARN is: " + data.TopicArn);
        }).catch(
            function(err) {
            console.error(err, err.stack);
        });
    }
}
