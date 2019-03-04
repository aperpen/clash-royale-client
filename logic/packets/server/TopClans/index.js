const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const tag2id = require('../../../../utils/tag2id')

module.exports.code = 28047
module.exports.decode = payload => {
    payload = ByteBuffer.fromBinary(payload)
    let json = {}
    let length = payload.readRrsInt32()
    json.clans = []
    for (let i = 0; i < length; i++) {
        json.clans[i] = {}
        json.clans[i].id = {
            high: payload.readRrsInt32(),
            low: payload.readRrsInt32()
        }
        json.clans[i].tag = tag2id.id2tag(json.clans[i].id.high, json.clans[i].id.low)
        json.clans[i].name = payload.readIString()
        json.clans[i].rank = payload.readRrsInt32()
        json.clans[i].trophies = payload.readRrsInt32()
        json.clans[i].previousRank = payload.readRrsInt32()
        payload.readRrsInt32() // SCID BADGES (16)
        json.clans[i].badge = payload.readRrsInt32()
        payload.readRrsInt32()
        payload.readRrsInt32() // SCID REGIONS
        json.clans[i].region = payload.readRrsInt32()
        json.clans[i].members = payload.readRrsInt32()
    }

    return json
}
