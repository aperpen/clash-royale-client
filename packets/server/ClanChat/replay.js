module.exports.decode = buffer => {
    let json = {}
    buffer.readByte()
    buffer.readInt32()
    buffer.readInt32()
    json.message = buffer.readIString()
    json.battleJson = buffer.readIString()
    buffer.readRrsInt32()
    buffer.readRrsInt32()
    json.arena = buffer.readRrsInt32()
    json.views = buffer.readRrsInt32()
    buffer.readByte()
    buffer.readRrsInt32()

    return json
}