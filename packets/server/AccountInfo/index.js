const ByteBuffer = require('../../../utils/bytebuffer-sc')
const log = require('../../../utils/console').log

module.exports.code = 28502

module.exports.decode = payload => {
  let buffer = ByteBuffer.fromBinary(payload)

  let json = {}
  buffer.readInt64() // ID
  json.checksumSeed = buffer.readRrsInt32()

  /* A BIT TRICKY BUT WORKS */
  try {
    let unlockedCardsHex = /0508((?:[0-9a-f]{4}|[0-9a-f]{2}))05/.exec(buffer.toHex(0))[1]
    json.unlockedCards = ByteBuffer.fromHex(unlockedCardsHex).readRrsInt32()
  } catch (e) {
    json.unlockedCards = false
  }
  return json
}

module.exports.callback = data => {
  if(data.unlockedCards)
    config.checksum = ((data.unlockedCards - 8) << 16) | data.checksumSeed
  else log('[WARN] Failed to calculate checksum, some commands won\'t work')
}