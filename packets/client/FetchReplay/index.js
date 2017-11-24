const ByteBuffer = require('../../../utils/bytebuffer-sc')

module.exports.code = 14114

module.exports.payload = (id, server) => {
    let buf = ByteBuffer.allocate(34)

    buf.writeInt32(id.high)
    buf.writeInt32(id.low)
    buf.writeByte(0)
    buf.writeByte(server)
    buf.writeByte(127)
    buf.writeByte(127)
    buf.writeByte(3)
    buf.writeByte(2)
    buf.writeRrsInt32(0)
    return buf.buffer
}
