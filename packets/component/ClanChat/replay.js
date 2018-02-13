module.exports.decode = buffer => {
    let json = {}
    buffer.readByte()
    buffer.readInt32()
    buffer.readInt32()
    json.message = buffer.readIString()
    json.battleJson = buffer.readIString()
    buffer.readRrsInt32()
    buffer.readRrsInt32() // ARENA SCID
    json.arena = buffer.readRrsInt32()
    json.views = buffer.readRrsInt32()
    buffer.readByte()
    let unk = buffer.readRrsInt32()
    if(unk) buffer.readRrsInt32()
    

    return json
}