const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const battle = require('../../component/ClanChat/battle')
const battleFinished = require('../../component/ClanChat/battleFinished')
const chat = require('../../component/ClanChat/chat')
const donation = require('../../component/ClanChat/donation')
const event = require('../../component/ClanChat/event')
const joinRequest = require('../../component/ClanChat/joinRequest')
const replay = require('../../component/ClanChat/replay')

const ids = {
    DONATION: 1,
    CHAT: 2,
    JOIN_REQUEST: 3,
    EVENT: 4,
    REPLAY: 5,
    BATTLE: 10,
    BATTLE_FINISHED: 11
}

const events = {
    KICK: 1,
    ACCEPTED: 2,
    JOINED: 3,
    LEFT: 4,
    PROMOTED: 5
}

module.exports.code = 23174

module.exports.decode = payload => {
    let buffer = ByteBuffer.fromBinary(payload)

    let entry = {}
    entry.id = buffer.readRrsInt32()
    buffer.readRrsInt32() // ENTRY ID
    buffer.readRrsInt32() // ENTRY ID
    entry.sender = {
        high: buffer.readRrsInt32(),
        low: buffer.readRrsInt32()
    }
    entry.user2 = {
        high: buffer.readRrsInt32(),
        low: buffer.readRrsInt32()
    }
    entry.senderNick = buffer.readIString()
    entry.senderLevel = buffer.readRrsInt32()
    entry.senderRole = buffer.readRrsInt32()
    entry.age = buffer.readRrsInt32()
    buffer.readByte()
    buffer.readByte()
    buffer.readByte()
    switch (entry.id) {
        case ids.BATTLE:
            entry.data = battle.decode(buffer)
            break
        case ids.BATTLE_FINISHED:
            entry.data = battleFinished.decode(buffer)
            break
        case ids.CHAT:
            entry.data = chat.decode(buffer)
            break
        case ids.DONATION:
            entry.data = donation.decode(buffer)
            break
        case ids.EVENT:
            entry.data = event.decode(buffer)
            break
        case ids.JOIN_REQUEST:
            entry.data = joinRequest.decode(buffer)
            break
        case ids.REPLAY:
            entry.data = replay.decode(buffer)
            break
    }

    return entry
}
