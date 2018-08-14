const fs = require('fs')
const prettyjson = require('prettyjson')

const consoleUtil = require('./utils/console')
const config = require('./config')
const packets = require('./logic/packets')

const savedSessions = fs.readdirSync(config.savePath).sort()

if (savedSessions.length > 0) {
  consoleUtil
    .prompt([
      {
        type: 'list',
        name: 'session',
        message: 'Select saved session',
        choices: savedSessions,
        pageSize: 10
      },
      {
        type: 'list',
        name: 'message',
        message: 'Select packet ID to replay',
        pageSize: 15,
        choices: answers => {
          let messages = []
          let files = fs.readdirSync(config.savePath + '/' + answers.session)
          for (let file of files) {
            let code = file.split(/-|\./).shift()
            if (messages.indexOf(code) === -1) messages.push(code)
          }
          return messages
            .filter(message => packets[message] !== undefined)
            .map(message => {
              return {
                name: packets[message].name,
                value: message
              }
            })
        }
      }
    ])
    .then(answers => {
      consoleUtil.setState(consoleUtil.states.REPLAYING)
      if (typeof packets[answers.message].decode == 'function') {
        let path = config.savePath + '/' + answers.session
        let files = fs.readdirSync(path)
          .filter(file => {
            let code = file.split(/-|\./).shift()
            return code === answers.message
          })
          .sort()
          .reverse()

        for (let file of files) {
          console.log('[*] Replaying', file)
          let payload = Buffer.from(fs.readFileSync(path + '/' + file, { encoding: 'hex' }), 'hex')
          console.log(prettyjson.render(packets[answers.message].decode(payload)))
        }
      } else {
        console.log('[!] Selected packet has not decode function')
        process.exit(0)
      }
    })
} else {
  console.log('[!] No saved sessions found')
  process.exit(0)
}
