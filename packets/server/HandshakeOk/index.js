module.exports.code = 20100

module.exports.callback = () => processor.send(packets.Login.code, packets.Login.payload())
