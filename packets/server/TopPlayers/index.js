const ByteBuffer = require('../../../utils/bytebuffer-sc')
const tag2id = require('../../../utils/tag2id')

module.exports.code = 21076
module.exports.decode = payload => {
    payload = ByteBuffer.fromBinary(payload)
    let json = {}
    let length = payload.readRrsInt32()
    json.players = []
    for (let i = 0; i < length; i++) {
        json.players[i] = {}
        json.players[i].id = {
            high: payload.readRrsInt32(),
            low: payload.readRrsInt32()
        }
        json.players[i].tag = tag2id.id2tag(json.players[i].id.high, json.players[i].id.low)
        json.players[i].name = payload.readIString()
        json.players[i].rank = payload.readRrsInt32()
        json.players[i].trophies = payload.readRrsInt32()
        json.players[i].previousRank = payload.readRrsInt32()
        json.players[i].level = payload.readInt32()
        payload.readInt32()
        payload.readInt32()
        payload.readInt32()
        payload.readInt32()
        payload.readInt32()
        payload.readInt32()
        payload.readByte()
        payload.readByte()
        payload.readInt32() // ID HIGH
        payload.readInt32() // ID LOW
        payload.readInt32()
        payload.readInt32()
        let hasClan = payload.readByte()
        if (hasClan === 1) {
            json.players[i].clan = {}
            json.players[i].clan.id = {
                high: payload.readInt32(),
                low: payload.readInt32()
            }
            json.players[i].clan.tag = tag2id.id2tag(json.players[i].clan.id.high, json.players[i].clan.id.low)
            json.players[i].clan.name = payload.readIString()
            payload.readRrsInt32() // SCID BADGES (16)
            json.players[i].clan.badge = payload.readRrsInt32()
            json.players[i].clan.warTrophies = payload.readRrsInt32()
            json.players[i].clan.role = payload.readByte()
        }

        payload.readRrsInt32() // SCID League
        payload.readRrsInt32() // LEAGUE
    }

    return json
}