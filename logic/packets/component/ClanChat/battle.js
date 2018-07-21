module.exports.decode = buffer => {
    let json = {}
    json.message = buffer.readIString()
    let id = buffer.readRrsInt32()
    switch(id){
        case 0:
            json.senderTrophies = buffer.readRrsInt32()
            buffer.readRrsInt32()
            buffer.readRrsInt32()
            buffer.readByte()
            break
        case 1:
            buffer.readIString()
            buffer.readRrsInt32()
            buffer.readByte()
            buffer.readRrsInt32()
            buffer.readRrsInt32()
            buffer.readInt64()
            buffer.readRrsInt32()
            buffer.readRrsInt32()
            break
    }
    buffer.readByte()

    return json
}