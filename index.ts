import fs from 'fs'
import stripAnsi from 'strip-ansi'
import { sendToRandomFixer } from './slack'

function extractFailedTestsMessages(filePath = './jest.json'): string[] {
  const metadata = JSON.parse(fs.readFileSync(filePath).toString())
  const failedTests = metadata.testResults.filter(({ status }) => status === 'failed')
  return failedTests.map(({ message }) => stripAnsi(message))
}

extractFailedTestsMessages().forEach(sendToRandomFixer)
