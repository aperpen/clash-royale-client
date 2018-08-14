const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const zlib = require('zlib')
const config = require('../../../../config')

module.exports.code = 10101

module.exports.version = 4

module.exports.payload = session => {
    let buf = new ByteBuffer
    buf.writeInt32(session.account.scid ? 0 : session.account.id.high)
    buf.writeInt32(session.account.scid ? 0 : session.account.id.low)
    buf.writeIString(session.account.scid ? '' : session.account.pass)
    buf.writeRrsInt32(3)
    buf.writeRrsInt32(0)
    buf.writeRrsInt32(1186)
    buf.writeIString(config.resourceSha)
    buf.writeInt32(0)
    buf.writeIString('4699c1d58f3532c1')
    buf.writeIString('')
    buf.writeIString('VirtualBox')
    buf.writeIString('e859e074-c4cb-1602-8227-c7de1ec71abc')
    buf.writeIString('6.0.1')
    buf.writeByte(1)
    buf.writeInt32(0)
    buf.writeIString('4699c1d58f3532c1')
    buf.writeIString('en-GB')
    buf.writeByte(1)
    buf.writeByte(0)
    buf.writeInt32(0)
    buf.writeByte(1)
    buf.writeInt32(0)
    buf.writeByte(2)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeInt32(0)

    if(!session.account.scid) buf.writeByte(0)
    else {
      buf.writeByte(1)
      buf.writeByte(1)
      buf.writeByte(8)
      buf.writeInt32(0);
      let token = Buffer.from(session.account.scidtoken, 'utf8')
      buf.LE()
      buf.writeInt32(token.length)
      buf.BE()
      buf.append(zlib.deflateSync(token))
    }

    return buf.buffer.slice(0, buf.offset)
}
