module.exports.code = 20104

module.exports.callback = () => {
    setInterval(() => {
        let crypted = crypto.encrypt(packets.KeepAlive.code, packets.KeepAlive.payload())
        processor.send(packets.KeepAlive.code, crypted)
    }, 10000)
    config.ticks = 1
    setInterval(() => {
        config.ticks += 2
    }, 100)
}