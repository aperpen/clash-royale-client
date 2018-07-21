const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const tag2id = require('../../../../utils/tag2id')

module.exports.code = 15566

module.exports.payload = (session, params) => {
    let buf = ByteBuffer.allocate(400)
    let id = tag2id.tag2id(params.tag)

    buf.writeInt32(id.high)
    buf.writeInt32(id.low)
    buf.writeIString(params.msg)
    buf.writeInt32(0)
    return buf.buffer.slice(0, buf.offset)
}
