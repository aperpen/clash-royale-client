module.exports.decode = buffer => {
    let json = {}
    json.battleJson = buffer.readIString()
    json.majorVersion = buffer.readRrsInt32()
    json.build = buffer.readRrsInt32()
    json.contentVersion = buffer.readRrsInt32()
    json.views = buffer.readRrsInt32()
    json.tournamentMode = buffer.readRrsInt32()
    json.replayAvailable = buffer.readByte()
    json.server = buffer.readByte()
    json.replay = {
        high: buffer.readInt32(),
        low: buffer.readInt32()
    }

    return json
}
