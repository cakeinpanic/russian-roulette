import { ChatPostMessageArguments, WebClient } from '@slack/web-api'

import dotenv from 'dotenv'
dotenv.config()

const token = process.env.SLACK_TOKEN
const channelId = process.env.CHANNEL_ID
const web = new WebClient(token)

export const sendToSlack = async (phrase) => {
  const res = await web.chat.postMessage({
    channel: channelId,
    blocks: [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': phrase
        }
      }
    ]
  } as ChatPostMessageArguments)
  console.log('Message sent: ', res.ts)
}
