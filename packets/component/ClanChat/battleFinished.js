module.exports.decode = buffer => {
    let json = {}
    json.battleJson = buffer.readIString()
    buffer.readRrsInt32()
    buffer.readRrsInt32()
    buffer.readRrsInt32()
    json.views = buffer.readRrsInt32()
    buffer.readRrsInt32()
    buffer.readByte()
    buffer.readInt32()
    buffer.readInt32()

    return json
}