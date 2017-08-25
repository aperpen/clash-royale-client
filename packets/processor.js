function Processor() {

}

Processor.prototype.send = (code, payload) => {
    let header = Buffer.alloc(7)
    header.writeUInt16BE(code, 0)
    header.writeUIntBE(payload.length, 2, 3)
    header.writeUInt16BE(0, 5)

    server.write(Buffer.concat([header, Buffer.from(payload)]))
}

Processor.prototype.keepAlive = () => {
    setInterval(() => {
        let crypted = crypto.encrypt(packets.KeepAlive.code, packets.KeepAlive.payload())
        Processor.prototype.send(packets.KeepAlive.code, crypted)
        console.log('[SENT]', packets.KeepAlive.code, Buffer.from(crypted).toString('hex').slice(0, 100) + '...')
    }, 10000)
}

module.exports = Processor