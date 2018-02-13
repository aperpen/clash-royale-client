module.exports.decode = buffer => {
    let json = {}
    json.message = buffer.readIString()
    json.nick = buffer.readIString()
    json.state = buffer.readRrsInt32()

    return json
}