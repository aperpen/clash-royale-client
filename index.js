const net = require('net')
const fs = require('fs')
const Processor = require('./packets/processor')
const Packetizer = require('./utils/packetizer')
const Crypto = require('./crypto/crypto')

var packetizer = new Packetizer()
var server = new net.Socket()

processor = new Processor(server)
config = require('./config')
crypto = new Crypto()
packets = {}


fs.readdir('./packets/client', (err, files) => {
    files.forEach(file => {
        let packet = require(`./packets/client/${file}`)
        packets[packet.code] = Object.assign({ name: file }, packet)
        packets[file] = packet
    })

    fs.readdir('./packets/server', (err, files) => {
        files.forEach(file => {
            let packet = require(`./packets/server/${file}`)
            packets[packet.code] = Object.assign({ name: file }, packet)
            packets[file] = packet
        })
        
        console.log('Loaded ' + Object.keys(packets).length + ' packets')
    })
})

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