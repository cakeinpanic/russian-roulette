import { getInput } from '@actions/core'
import { ChatPostMessageArguments, WebClient } from '@slack/web-api'

import dotenv from 'dotenv'

dotenv.config()

const token = process.env.SLACK_TOKEN || getInput('slack-token', { required: true })
const channelId = process.env.CHANNEL_ID || getInput('slack-channel', { required: true })
const web = new WebClient(token)

console.log(token)

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


import randomItem from 'random-item'
const fixersList: string[] = (process.env.FIXERS || getInput('fixers', { required: true })).split(',')

export const sendToRandomFixer = (message: string) => {
  const fixer = randomItem(fixersList)
  sendToSlack(`Lucky one is <@${fixer}>! You are honoured to fix this one:\n \`\`\`${message}\`\`\``)
}
