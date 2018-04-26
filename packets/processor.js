const prettyjson = require('prettyjson')
const crypto = require('../crypto/crypto')
const cnsl = require('../utils/console')

function Processor(server) {
    this.server = server
}

Processor.prototype.send = function (code, payload) {
    let crypted = crypto.encrypt(code, payload)
    let header = Buffer.alloc(7)
    header.writeUInt16BE(code, 0)
    header.writeUIntBE(crypted.length, 2, 3)
    header.writeUInt16BE(code === 10101 ? 4 : 0, 5)

    this.server.write(Buffer.concat([header, Buffer.from(crypted)]))
    cnsl.log('📤 ' + (packets[code] && packets[code].name ? packets[code].name : code))
}

Processor.prototype.parse = (code, buffer) => {
    cnsl.log('📥 ' + (packets[code] && packets[code].name ? packets[code].name : code))
    // if (packets[code] && packets[code].name === 'ClanChatEntry') cnsl.dump(Buffer.from(buffer).toString('hex'))
    if (packets[code] && !packets[code].disabled) {
        if (typeof packets[code].decode == 'function') {
            try {
                let data = packets[code].decode(buffer)
                cnsl.log(prettyjson.render(data))
                if (typeof packets[code].callback == 'function') packets[code].callback(data)
            } catch (e) {
                cnsl.log('✖️ Error decoding ' + code + ' packet')
                cnsl.log(e)
            }
        } else if (typeof packets[code].callback == 'function') packets[code].callback()
    }
}

module.exports = Processor