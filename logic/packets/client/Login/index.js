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
    buf.writeRrsInt32(1282)
    buf.writeIString(config.resourceSha)
    buf.writeInt32(0)
    buf.writeIString('15c5b3d6c0ec269c')
    buf.writeIString('')
    buf.writeIString('KFSOWI')
    buf.writeInt32(0)
    buf.writeIString('4.4.3')
    buf.writeByte(1)
    buf.writeInt32(0)
    buf.writeIString('15c5b3d6c0ec269c')
    buf.writeIString('es-ES')
    buf.writeByte(1)
    buf.writeByte(3)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeByte(0)
    buf.writeByte(2)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeInt32(0)
    buf.writeInt32(0)
    let token
    if(session.account.scid) {
      buf.writeByte(1)
      buf.writeByte(8)
      token = Buffer.from(session.account.scidtoken, 'utf8')
    } else {
      buf.writeByte(0)
      buf.writeByte(12)
      token = Buffer.from('')
    }
    buf.LE()
    buf.writeInt32(token.length)
    buf.BE()
    buf.append(zlib.deflateSync(token))
    return buf.buffer.slice(0, buf.offset)
}
