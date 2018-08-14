const commands = require('./')
const prettyjson = require('prettyjson')

module.exports.run = (session, args) => {
  let help = ''
  if (args[0]) {
    let command = commands.match(args[0])
    if (command) {
      if (command.help) {
        command.help.legend = {
          '<param>': 'Required param',
          '[param]': 'Optional param'
        }
        command.help.alias = command.config.alias
        help += prettyjson.render(command.help)
      } else {
        help = 'Command has not help'
      }
    } else {
      help = 'Command not found'
    }
  } else {
    help = 'Avaiable commands:\n' + commands.list.map(cmd => cmd.config.name)
    help += '\n\nFor custom command help type: help command\nExample: help top'
  }
  console.log(help)
}

module.exports.config = {
  name: 'help',
  alias: ['h']
}

module.exports.help = {
  'usage': 'help command?',
  'example': 'help\nhelp top',
  'description': 'Gives help'
}
