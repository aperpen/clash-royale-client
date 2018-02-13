module.exports.decode = buffer => {
    let json = {}
    json.id = buffer.readRrsInt32()
    json.initiator = {
        high: buffer.readRrsInt32(),
        low: buffer.readRrsInt32()
    }
    json.initiatorNick = buffer.readIString()

    return json
}