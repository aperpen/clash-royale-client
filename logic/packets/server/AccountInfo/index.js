const ByteBuffer = require('../../../../utils/bytebuffer-sc')

module.exports.code = 24660

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

module.exports.callback = (session, data) => {
  if(data.unlockedCards)
    session.checksum = ((data.unlockedCards - 8) << 16) | data.checksumSeed
  else console.log('[WARN] Failed to calculate checksum, some commands won\'t work')
}
