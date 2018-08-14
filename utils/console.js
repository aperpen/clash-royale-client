const inquirer = require('inquirer')
const readline = require('readline')
const commands = require('../logic/commands')
const states = {
  FREE: 0,
  PROMPTING: 1,
  REPLAYING: 2
}
const _log = console.log

let rl = null
let __state = states.FREE
let __logQueue = []

module.exports.prompt = questions => {
  if (rl) rl.close()
  if (__state === states.PROMPTING) return Promise.resolve(false)
  __state = states.PROMPTING
  return inquirer
    .prompt(questions)
    .then(answers => {
      setState(states.FREE)
      // Create a new rl, after inquirer closed it
      // We need this to keep listening to keypress event
      rl = readline.createInterface({
        terminal: true,
        input: process.stdin,
        output: process.stdout
      })
      rl.resume()
      return answers
    })
}

process.stdin.setRawMode(true)
process.stdin.on('keypress', (str, key) => {
  if (__state === states.FREE && key.sequence === '\u001bc') {
    module.exports.prompt({
      type: 'input',
      name: 'command',
      msg: 'Input command'
    }).then(answer => commands.execute(answer.command))
  } else if(key.sequence === '\u0003') process.exit()
})
process.on('SIGINT', () => process.exit()) // Raw mode

console.log = function() {
  if (__state === states.FREE || __state === states.REPLAYING) _log.apply(console, arguments)
  else __logQueue.push(arguments)
}

const setState = state => {
  __state = state
  if (state === states.FREE) {
    for (let entry of __logQueue) {
      _log.apply(console, entry)
    }
    __logQueue = []
  }
}

module.exports.states = states
module.exports.setState = setState
