module.exports.code = 20677

module.exports.callback = () => {
    require('../../../commands') // LAUNCH CMD SERVICE
    setInterval(() => {
        processor.send(packets.KeepAlive.code, packets.KeepAlive.payload())
    }, 10000)
    config.ticks = 1
    setInterval(() => {
        config.ticks += 2
    }, 100)

}
