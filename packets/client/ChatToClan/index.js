const ByteBuffer = require('../../../utils/bytebuffer-sc')

module.exports.code = 10644
module.exports.payload = message => {
    let buf = ByteBuffer.allocate(1000)

    buf.writeIString(message)

    return buf.buffer.slice(0, buf.offset)
}
