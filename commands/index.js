const net = require('net')
const fs = require('fs')
const exec = require('child_process').exec
commands = {}

fs.readdir('./commands/src', (err, files) => {
    files.forEach(file => {
        commands[file.slice(0, -3)] =  require(`./src/${file}`)
    })

    console.log('Loaded ' + Object.keys(packets).length + ' packets')
})

var server = net.createServer()

server.on('connection', client => {
    console.log('[SERVER] New client connected to the commands server')
    client.on('data', input => {
        let command = input.toString().split(' ').map(t => t.trim())
        if(commands[command[0]]) commands[command.shift()].run(command, client)
    })
})

server.listen(1339, '0.0.0.0', () => {
    console.log('Commands server set up')
    // exec('gnome-terminal --working-directory=$(pwd)/commands -- node client.js')
})