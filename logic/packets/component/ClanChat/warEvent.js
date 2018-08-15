module.exports.decode = buffer => {
    buffer.printDebug()
    let json = {}
    json.status = buffer.readRrsInt32() // 1 = war ended, 0 = war active
    json.trophyChange = buffer.readRrsInt32()
    json.rank = buffer.readRrsInt32() + 1

    return json
}
