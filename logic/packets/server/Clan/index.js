const tag2id = require('../../../../utils/tag2id')
const ByteBuffer = require('../../../../utils/bytebuffer-sc')

module.exports = {
  code: 25719,
  decode: (payload) => {
    payload = ByteBuffer.fromBinary(payload)

    let json = {}

    json.id = payload.readInt64()
    json.tag = tag2id.id2tag(json.id.high, json.id.low)
    json.name = payload.readIString()
    payload.readRrsInt32() // SCID BADGES ID
    json.badge = payload.readRrsInt32()
    json.status = payload.readByte()
    json.members = payload.readByte()
    json.trophies = payload.readRrsInt32()
    json.requiredTrophies = payload.readRrsInt32()

    payload.readByte()
    payload.readByte()
    payload.readRrsInt32()
    payload.readRrsInt32()

    json.donations = payload.readRrsInt32()

    payload.readRrsInt32()
    payload.readByte()
    payload.readByte()

    payload.readRrsInt32()
    json.region = payload.readRrsInt32()

    payload.readRrsInt32()

    json.warTrophies = payload.readRrsInt32()
    json.description = payload.readIString()
    json.members = []

    json.membersCount = payload.readRrsInt32()
    for (let i = 0; i < json.membersCount; i++) {
      let member = {}
      member.id = payload.readInt64()
      member.tag = tag2id.id2tag(member.id.high, member.id.low)
      delete member.id
      member.nick = payload.readIString()
      payload.readRrsInt32() // SCID ARENAS ID (54)
      member.arena = payload.readRrsInt32()
      member.role = payload.readByte()
      member.level = payload.readRrsInt32()
      member.trophies = payload.readRrsInt32()
      member.donations = payload.readRrsInt32()

      payload.readVarint32()
      payload.readByte()
      payload.readByte()

      payload.readRrsInt32()
      payload.readRrsInt32()
      payload.readRrsInt32()
      payload.readRrsInt32()
      payload.readByte()
      payload.readByte()
      payload.readInt64()

      json.members.push(member)
    }
    payload.readByte()
    payload.readByte()
    payload.readByte()
    payload.readByte()
    payload.readByte()
    payload.readRrsInt32()

    return json
  }
}
