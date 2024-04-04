const express = require('express');
const axios   = require('axios').default;
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const env = require('./env');
//const validator = require('validator');

const routes = express.Router();

// ...
// TMS API.
routes.post('/content', async (req, res) => {
    try {
        const response = await axios.post('http://validator/resources');
        console.log(response);

        const client = new SNSClient({ region: "eu-north-1" });
        const {ordersTopic} = JSON.parse(process.env.COPILOT_SNS_TOPIC_ARNS);
        const out = await client.send(new PublishCommand({
          Message: response.data.id,
          TopicArn: env.requestsTopic,
    }));

        res.send(response.data.id);
    } catch (error) {
      console.error(error);
    }
    
});


module.exports = routes;

