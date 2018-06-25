const ByteBuffer = require('../../../utils/bytebuffer-sc')
const tag2id = require('../../../utils/tag2id')

module.exports.code = 15566

module.exports.payload = (tag, msg) => {
    let buf = ByteBuffer.allocate(400)
    let id = tag2id.tag2id(tag)

    buf.writeInt32(id.high)
    buf.writeInt32(id.low)
    buf.writeIString(msg)
    buf.writeInt32(0)
    return buf.buffer.slice(0, buf.offset)
}
