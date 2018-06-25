const ByteBuffer = require('../../../utils/bytebuffer-sc')

module.exports.code = 10100
module.exports.payload = () => {
    let buf = ByteBuffer.allocate(72)

    buf.writeInt32(2)
    buf.writeInt32(19)
    buf.writeInt32(3)
    buf.writeInt32(0)
    buf.writeInt32(1185)
    buf.writeIString(config.resourceSha)
    buf.writeInt32(2)
    buf.writeInt32(2)
    return buf.buffer
}
