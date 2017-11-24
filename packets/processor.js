const prettyjson = require('prettyjson')

function Processor(server) {
    this.server = server
}

Processor.prototype.send = function (code, payload) {
    let crypted = crypto.encrypt(code, payload)
    let header = Buffer.alloc(7)
    header.writeUInt16BE(code, 0)
    header.writeUIntBE(crypted.length, 2, 3)
    header.writeUInt16BE(0, 5)

    this.server.write(Buffer.concat([header, Buffer.from(crypted)]))
    console.log('📤 ' + (packets[code] && packets[code].name ? packets[code].name : code))
}

Processor.prototype.parse = (code, buffer) => {
    console.log('📥 ' + (packets[code] && packets[code].name ? packets[code].name : code))
    if (packets[code]) {
        if (typeof packets[code].decode == 'function') {
            try {
                let data = packets[code].decode(buffer)
                console.log(prettyjson.render(data))
                if (typeof packets[code].callback == 'function') packets[code].callback(data)
            } catch (e) {
                console.error('✖️ Error decoding ' + code + ' packet')
                console.log(e)
            }
        } else if (typeof packets[code].callback == 'function') packets[code].callback()
    }
}

module.exports = Processor