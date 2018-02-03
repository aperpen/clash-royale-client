const ByteBuffer = require('../../../utils/bytebuffer-sc')
const tag2id = require('../../../utils/tag2id')

module.exports.code = 25191
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
        json.players[i].unk1 = payload.readLong()
        json.players[i].unk2 = payload.readRrsInt32()
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
        }
    }
    json.hoster = {}
    json.hoster.id = {
        high: payload.readInt32(),
        low: payload.readInt32()
    }
    json.hoster.tag = tag2id.id2tag(json.hoster.id.high, json.hoster.id.low)
    let sharedClanId = {
        high: payload.readInt32(),
        low: payload.readInt32()
    }
    if (sharedClanId.high > -1) {
        json.sharedWithClan = true
        json.clanSharedWith = {}
        json.clanSharedWith.id = sharedClanId
        json.clanSharedWith.tag = tag2id.id2tag(json.clanSharedWith.id.high, json.clanSharedWith.id.low)
    } else {
        json.sharedWithClan = false
    }

    json.tourneyId = {
        high: payload.readInt32(),
        low: payload.readInt32()
    }
    json.tourneyTag = tag2id.id2tag(json.tourneyId.high, json.tourneyId.low)
    json.tourneyName = payload.readIString()
    json.description = payload.readIString()
    json.unkString = payload.readIString()
    json.duration = payload.readRrsInt32()
    json.joinedMembers = payload.readRrsInt32()
    json.capacity = payload.readRrsInt32()
    json.tourneyType = payload.readByte() // 0 PUBLIC | 1 PRIVATE
    json.remainingSeconds = payload.readRrsInt32()
    json.preparationSeconds = payload.readRrsInt32()
    json.unk1 = payload.readLong()
    json.unk2 = payload.readRrsInt32()
    json.started = payload.readByte()
    json.unk3 = payload.readByte()
    json.unk4 = payload.readRrsInt32()

    return json
}