import fs from 'fs'
import stripAnsi from 'strip-ansi'
import { sendToSlack } from './slack'

function extractFailedTestsMessages(filePath = './jest.json'): string[] {
  const metadata = JSON.parse(fs.readFileSync(filePath).toString())
  const failedTests = metadata.testResults.filter(({ status }) => status === 'failed')
  return failedTests.map(({ message }) => stripAnsi(message))
}

sendToSlack(extractFailedTestsMessages().join(''))
