const net = require('net')
const fs = require('fs')
const screen = require('../utils/console')
let commands = {}

fs.readdir('./commands/src', (err, files) => {
    files.forEach(file => {
        module.exports.commands[file.slice(0, -3)] = require(`./src/${file}`)
    })
})

module.exports.commands = {}

module.exports.run = input => {
    let command = input.toString().split(' ').map(t => t.trim())
    if (module.exports.commands[command[0]]) {
        if(module.exports.commands[command[0]].disabled) screen.log('Command disabled')
        else module.exports.commands[command.shift()].run(command)
    }
}