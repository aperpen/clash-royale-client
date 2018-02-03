const net = require('net')
const fs = require('fs')
const prompt = require('prompt-promise')
const Packetizer = require('./utils/packetizer')
const Processor = require('./packets/processor')
const crypto = require('./crypto/crypto')
const tag2id = require('./utils/tag2id')
const screen = require('./utils/console')

var packetizer = new Packetizer()
var server = new net.Socket()

processor = new Processor(server)
config = require('./config')
packets = {}


fs.readdir('./packets/client', (err, files) => {
    files.forEach(file => {
        let packet = require(`./packets/client/${file}`)
        packets[packet.code] = Object.assign({
            name: file
        }, packet)
        packets[file] = packet
    })

    fs.readdir('./packets/server', (err, files) => {
        files.forEach(file => {
            let packet = require(`./packets/server/${file}`)
            packets[packet.code] = Object.assign({
                name: file
            }, packet)
            packets[file] = packet
        })
    })
})

screen.banner()
selectAccount().then(acc => {
    screen.init()
    acc.id = tag2id.tag2id(acc.tag)
    config.account = acc

    server.connect(9339, 'game.clashroyaleapp.com', () => {
        processor.send(packets.Handshake.code, packets.Handshake.payload())
    })

    server.on('data', chunk => {
        packetizer.packetize(chunk, (packet) => {
            let message = {
                code: packet.readUInt16BE(0),
                length: packet.readUIntBE(2, 3),
                payload: packet.slice(7, packet.length)
            }
            let decrypted = crypto.processPacket(message)
            processor.parse(message.code, decrypted)
        })
    })
})

async function selectAccount() {
    if (!Array.isArray(config.credentials))
        return config.credentials
    else if (config.credentials.length === 1)
        return config.credentials[0]
    else {
        console.log('Accounts:')
        for (let i in config.credentials) {
            let account = config.credentials[i]
            console.log(`[${i}] ${account.name ? account.name : account.tag}`)
        }

        let selected = await prompt('Select an account: ')
        if (config.credentials[selected] === undefined) {
            console.log('Invalid account')
            process.exit()
        } else return config.credentials[selected]
    }
}