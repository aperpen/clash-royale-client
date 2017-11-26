const ByteBuffer = require('../../../utils/bytebuffer-sc')

module.exports.code = 10101
module.exports.payload = () => {
    let buf = ByteBuffer.allocate(254)
    
    buf.writeInt32(config.account.id.high)
    buf.writeInt32(config.account.id.low)
    buf.writeIString(config.account.pass)
    buf.writeRrsInt32(3)
    buf.writeByte(0)
    buf.writeRrsInt32(690)
    buf.writeIString(config.resourceSha)
    buf.writeRrsInt32(0)
    buf.writeInt32(0)
    buf.writeIString('4699c1d58f3532c1')
    buf.writeIString('')
    buf.writeIString('VirtualBox')
    buf.writeIString('e859e074-c4cb-1602-8227-c7de1ec71abc')
    buf.writeIString('6.0.1')
    buf.writeByte(1)
    buf.writeInt32(0)
    buf.writeIString('4699c1d58f3532c1')
    buf.writeIString('en-US')
    buf.writeByte(1)
    buf.writeByte(3)
    buf.writeInt32(0)
    buf.writeByte(1)
    buf.writeInt32(0)
    buf.writeRrsInt32(2)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeByte(0)

    return buf.buffer
}
