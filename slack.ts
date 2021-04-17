import { getInput } from '@actions/core'
import { ChatPostMessageArguments, WebClient } from '@slack/web-api'

import env from 'dotenv'
import randomItem from 'random-item'

env.config()

const token = process.env.SLACK_TOKEN || getInput('slack-token', { required: true })
const channelId = process.env.CHANNEL_ID || getInput('slack-channel', { required: true })
const web = new WebClient(token)

export const sendToSlack = async (phrase) => {
  //console.log(phrase)
  //const users = await web.conversations.members({ channel: channelId })
  //console.log(users);
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

const fixersList: string[] = (process.env.FIXERS || getInput('fixers', { required: true })).split(',')

export const sendToRandomFixer = (message: string) => {
  const fixer = randomItem(fixersList)
  sendToSlack(`Lucky one is <@${fixer}>! You are honoured to fix this one:\n` + message)
}
