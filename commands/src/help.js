const log = require('../../utils/console').log

module.exports.run = (args) => {
    let help = ''
    let commands = require('../index').commands
    if (args[0]) {
        if (commands[args[0]]) {
            if (commands[args[0]].help) {
                if (commands[args[0]].help.usage) {
                    help += 'Usage:\n' + commands[args[0]].help.usage + '\n\n'
                }
                if (commands[args[0]].help.description) {
                    help += 'Info:\n' + commands[args[0]].help.description + '\n\n'
                }
                if (commands[args[0]].help.example) {
                    help += 'Example:\n' + commands[args[0]].help.example + '\n'
                }
            } else {
                help = 'Command has not help'
            }
        } else {
            help = 'Command not found'
        }
    } else {
        help = 'Avaiable commands:\n' + Object.keys(commands).join(', ')
        help += '\n\nFor custom command help type: help command\nExample: help top'
    }
    log(help)
}

module.exports.help = {
    'usage': 'help command?',
    'example': 'help\nhelp top',
    'description': 'Gives help'
}