const net = require('net')
const fs = require('fs')
const Processor = require('./packets/processor')
const Packetizer = require('./utils/packetizer')
const Crypto = require('./crypto/crypto')

var processor = new Processor()
var packetizer = new Packetizer()

config = require('./config')
crypto = new Crypto()
ByteBuffer = require('./utils/bytebuffer-sc')
server = new net.Socket()
packets = {}

fs.readdir('./packets/client', (err, files) => {
    files.forEach(file => {
        packets[file] = require(`./packets/client/${file}/main`)
    })

    console.log('Loaded ' + Object.keys(packets).length + ' definitions')
})

server.connect(9339, 'game.clashroyaleapp.com', () => {
    processor.send(packets.Handshake.code, packets.Handshake.payload())
    console.log('[SENT]', packets.Handshake.code, Buffer.from(packets.Handshake.payload()).toString('hex').slice(0,100)+'...')
})

server.on('data', chunk => {
    packetizer.packetize(chunk, (packet) => {
        let message = {
            code: packet.readUInt16BE(0),
            length: packet.readUIntBE(2, 3),
            payload: packet.slice(7, packet.length)
        }

        let decrypted = crypto.processPacket(message)
        console.log('[RECEIVED]', message.code, Buffer.from(decrypted).toString('hex').slice(0,100)+'...')
        switch (message.code) {
            case 20100:
                let crypted = crypto.encrypt(packets.Login.code, packets.Login.payload())
                processor.send(packets.Login.code, crypted)
                console.log('[SENT]', packets.Login.code, Buffer.from(crypted).toString('hex').slice(0,100)+'...')
                break;
            case 20104:
                console.log('Logged in successfully!!')
                let cryptedKa = crypto.encrypt(packets.AskForTournaments.code, packets.AskForTournaments.payload())
                processor.send(packets.AskForTournaments.code, cryptedKa)
            default:
                break;
        }
    })
})