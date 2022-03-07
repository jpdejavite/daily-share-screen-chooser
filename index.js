const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const token = process.env.SLACK_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const { App, LogLevel } = require("@slack/bolt");

express()
  .use(bodyParser.json())
  .get('/', (req, res) => res.render('pages/index'))
  .post('/profile', (req, res, next) => {
    console.log(req.body)
    res.json(req.body)
  })
  .post('/slack/message-sent', async (req, res) => {
    if (!req || !req.body) {
      return res.status(200).send({});
    }

    if (req.body.challenge) {
      return res.status(200).send(req.body.challenge);
    }

    if (req.body.type === 'message') {

      // {
      //   "type": "message",
      //   "channel": "C2147483705",
      //   "user": "U2147483697",
      //   "text": "Hello world",
      //   "ts": "1355517523.000005"
      // }
      console.log('message:' + req.body);
    }
    console.log(req.body);

    return res.status(200).send({});

    // const app = new App({
    //   token,
    //   signingSecret: "52aff634a2c57d88be21f462743dcd77",
    //   // LogLevel can be imported and used to make debugging simpler
    //   logLevel: LogLevel.DEBUG
    // });


    // try {
    //   // // Call the chat.postMessage method using the built-in WebClient
    //   const result = await app.client.chat.postMessage({
    //     // The token you used to initialize your app
    //     token,
    //     channel: channelId,
    //     text: 'Hello World'
    //     // You could also use a blocks[] array to send richer content
    //   });

    //   // Print result, which includes information about the message (like TS)
    //   console.log(result);
    // }
    // catch (error) {
    //   console.error(error);
    // }

    // return res.status(200).send({});
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
