const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const config = require('../../../../config')

module.exports.code = 10100
module.exports.payload = () => {
    let buf = ByteBuffer.allocate(72)

    buf.writeInt32(2)
    buf.writeInt32(19)
    buf.writeInt32(config.version.major)
    buf.writeInt32(0)
    buf.writeInt32(config.version.build)
    buf.writeIString(config.resourceSha)
    buf.writeInt32(2)
    buf.writeInt32(2)
    return buf.buffer
}
