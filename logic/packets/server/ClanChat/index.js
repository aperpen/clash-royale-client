const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const ClanChat = require('../../component/ClanChat')

module.exports.code = 24435

module.exports.decode = payload => {
    let buffer = ByteBuffer.fromBinary(payload)
    let json = []
    let count = buffer.readRrsInt32()

    for (let i = 0; i < count; i++) {
        json.push(ClanChat.decode(buffer))
    }

    return json
}

// module.exports.disabled = true
