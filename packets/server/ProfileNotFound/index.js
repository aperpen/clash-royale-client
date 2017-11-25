const ByteBuffer = require('../../../utils/bytebuffer-sc')
const tag2id = require('../../../utils/tag2id')

module.exports.code = 24117

module.exports.decode = (payload) => {
    let buffer = ByteBuffer.fromBinary(payload)
    buffer.readByte()
    return {
        tag: tag2id.id2tag(buffer.readInt32(), buffer.readInt32())
    }
}