# daily-share-screen-chooser

A NodeJS simple API to choose for a daily a user to share screen

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

Configure your .env file

```
PORT=3000
SLACK_CHANNEL_ID=channel-id
SLACK_TOKEN=your-bot-slack-token
SLACK_SIGNING_SECRET=app-signing-secret
SLACK_MESSAGE_TAG=daily-share-screen-chooser
SLACK_MESSAGE_PICK_TEXT=A pessoa da vez é
SLACK_USER_LIST=<@user-id-1>,<@user-id-2>
```

Execute the commands

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ heroku local web
```

Your app should now be running on [localhost:3000](http://localhost:3000/).


## Test via curl

```
curl --location --request POST 'http://localhost:3000/slack/message-sent' \
--header 'Content-Type: application/json' \
--data-raw '{
   "token": "eKzRGJK94VthueIqPSoUwEpC",
   "team_id": "TBR3V6RTK",
   "api_app_id": "A02D7JB889E",
   "event": {
     "client_msg_id": "28e674d2-85e3-4404-b886-8a75c97cf21e",
     "type": "message",
     "text": "Quem vai compartilhar a tela na daily hoje? #daily-share-screen-chooser",
     "user": "U024BGFFUQG",
     "ts": "1646694976.425339",
     "team": "TBR3V6RTK",
     "channel": "C035TSC55RU",
     "event_ts": "1646694976.425339",
     "channel_type": "channel"
   },
   "type": "event_callback",
   "event_id": "Ev0360QBQ2MQ",
   "event_time": 1646692531,
   "authorizations": [
     {
       "enterprise_id": null,
       "team_id": "TBR3V6RTK",
       "user_id": "U02DGPS88GZ",
       "is_bot": true,
       "is_enterprise_install": false
     }
   ],
   "is_ext_shared_channel": false,
   "event_context": "4-eyJldCI6Im1lc3NhZ2UiLCJ0aWQiOiJUQlIzVjZSVEsiLCJhaWQiOiJBMDJEN0pCODg5RSIsImNpZCI6IkMwMzVUU0M1NVJVIn0"
 }'
```
