const fs = require('fs')
const session = require('../session')
let commands = []

fs.readdir('./logic/commands', (err, files) => {
  files.forEach(file => {
    if (file !== 'index.js') {
      let cmd = require(`./${file}`)
      if (!cmd.disabled) commands.push(cmd)
    }
  })
})

module.exports.match = input => {
  input = input.toLowerCase()
  for (let cmd of commands) {
    if (cmd.config.name === input || (cmd.config.alias && cmd.config.alias.indexOf(input) > -1)) return cmd
  }

  return false
}

module.exports.execute = input => {
  let params = input
    .trim()
    .replace(/ +(?= )/g, '')
    .split(' ')
  let command = module.exports.match(params[0])
  if (command) command.run(session, params.slice(1))
  else console.log('Command not found. Type help to get started.')
}

module.exports.list = commands
