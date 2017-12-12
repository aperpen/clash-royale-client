const ByteBuffer = require('../../../utils/bytebuffer-sc')

module.exports.code = 28502

module.exports.decode = (payload) => {
    payload = ByteBuffer.fromBinary(payload)

    let json = {}
    payload.readInt64() // ID
    json.checksumSeed = payload.readRrsInt32()

    /* A BIT TRICKY BUT WORKS */
    let unlockedCardsHex = /0508((?:[0-9a-f]{4}|[0-9a-f]{2}))0509/.exec(payload.toHex(0))[1]
    json.unlockedCards = ByteBuffer.fromHex(unlockedCardsHex).readRrsInt32()
    return json
  }

module.exports.callback = (data) => {
  config.checksum = ((data.unlockedCards - 8) << 16) | data.checksumSeed
}

