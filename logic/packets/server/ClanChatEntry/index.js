const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const ClanChat = require('../../component/ClanChat')

module.exports.code = 23174

module.exports.decode = payload => {
    let buffer = ByteBuffer.fromBinary(payload)

    return ClanChat.decode(buffer)
}
