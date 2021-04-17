import core from '@actions/core'
import fs from 'fs'
import randomItem from 'random-item'

import stripAnsi from 'strip-ansi'
import { sendToSlack } from './slack'

function extractFailedTestsMessages(filePath = './jest.json'): string[] {
  const metadata = JSON.parse(fs.readFileSync(filePath).toString())
  const failedTests = metadata.testResults.filter(({ status }) => status === 'failed')
  return failedTests.map(({ message }) => stripAnsi(message))
}

const fixersList = JSON.parse(core.getInput('fixers', { required: true }))

extractFailedTestsMessages().map(message => {
  const fixer = randomItem(fixersList)
  sendToSlack(`Lucky one is <@${fixer}>! You are honoured to fix this one:\n` + message)
})

