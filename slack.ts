import core from '@actions/core'
import { ChatPostMessageArguments, WebClient } from '@slack/web-api'

const token = core.getInput('slack-token', { required: true })
const conversationId = core.getInput('slack-channel', { required: true })
const web = new WebClient(token)

export const sendToSlack = async (phrase) => {
  console.log(phrase)
  //const users = await web.conversations.members({ channel: conversationId })
  //console.log(users);
  const res = await web.chat.postMessage({
    channel: conversationId,
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

