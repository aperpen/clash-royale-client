module.exports.decode = buffer => {
    let json = {}

    buffer.readRrsInt32()
    buffer.readRrsInt32()
    buffer.readRrsInt32()
    json.maximum = buffer.readRrsInt32()
    buffer.readRrsInt32()
    buffer.readRrsInt32()
    buffer.readRrsInt32()

    let length = buffer.readRrsInt32()
    json.donations = []
    for(let i = 0; i < length; i++){
        let donation = {}
        donation.user = buffer.readInt64()
        donation.count = buffer.readRrsInt32()
        for(let y = 0; y < donation.count; y++){
            buffer.readRrsInt32()
        }
        json.donations.push(donation)
    }

    let spellsLength = buffer.readRrsInt32()
    json.spells = []
    for(let i = 0; i < spellsLength; i++){
        let spell = {
            scid: {
                high: buffer.readRrsInt32(),
                low: buffer.readRrsInt32()
            }
        }
        buffer.readRrsInt32()
        json.spells.push(spell)
    }
    buffer.readByte()
    buffer.readByte()
    buffer.readByte()
    buffer.readByte()
    return json
}