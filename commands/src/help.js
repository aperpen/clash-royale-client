module.exports.run = (args, client) => {
    let help = ''
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
    client.write(JSON.stringify({
        code: 1,
        text: help
    }))
}

module.exports.help = {
    'usage': 'help command?',
    'example': 'help\nhelp top',
    'description': 'Gives help'
}