const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { App, LogLevel } = require("@slack/bolt");
const { threadId } = require('worker_threads');

const port = process.env.PORT || 3000;
const token = process.env.SLACK_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;
const signingSecret = process.env.SLACK_SIGNING_SECRET;
const messageTag = process.env.SLACK_MESSAGE_TAG;
const messagePickText = process.env.SLACK_MESSAGE_PICK_TEXT;

const EVENT_TYPE_MESSAGE = 'message';

const app = new App({
  token,
  signingSecret,
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});


const processEvent = async (event) => {
  if (EVENT_TYPE_MESSAGE !== event.type) {
    console.log('event is not interesting');
    return
  }

  if (channelId !== event.channel) {
    console.log('a message was sent to channel i am not interested');
    return
  }

  const lastPick = await findLastDailyShareScreenPick();
  await sendMessageToSlack(event, lastPick);
};

const findLastDailyShareScreenPick = async () => {
  try {
    const result = await app.client.conversations.history({
      channel: channelId,
      token
    });
    if (!result.messages) {
      return;
    }
    for (var i = 0; i < result.messages.length; i++) {
      const message = result.messages[i];
      if (message.text.includes(messageTag)) {
        const replies = await app.client.conversations.replies({
          channel: channelId,
          ts: message.ts,
        });

        if (replies.messages) {
          for (var j = 0; j < replies.messages.length; j++) {
            const reply = replies.messages[j];

            if (reply.text.includes(messagePickText)) {
              return reply.text.replace(messagePickText, '');
            }
          }
        }
      }
    }

  } catch (error) {
    console.error(error);
  }
};

const sendMessageToSlack = async (event, lastPick) => {
  if (!event.text.includes(messageTag)) {
    return;
  }
  try {
    await app.client.chat.postMessage({
      token,
      channel: channelId,
      text: 'Hello World ' + lastPick,
      thread_ts: event.event_ts,
    });

  } catch (error) {
    console.error(error);
  }
};

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

    if (req.body.event) {
      console.log('an event was sent');
      await processEvent(req.body.event);
    }

    return res.status(200).send({});
  })
  .listen(port, () => console.log(`Listening on ${port}`));
