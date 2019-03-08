const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const zlib = require('zlib')
const config = require('../../../../config')

module.exports.code = 10101

module.exports.version = 4

module.exports.payload = session => {
    let buf = new ByteBuffer
    buf.writeInt32(session.account.id.high || 0)
    buf.writeInt32(session.account.id.low || 0)
    buf.writeIString(session.account.pass || '')
    buf.writeRrsInt32(config.version.major)
    buf.writeRrsInt32(0)
    buf.writeRrsInt32(config.version.build)
    buf.writeIString(config.resourceSha)
    buf.writeIString('')
    buf.writeIString('15c5b3d6c0ec269c')
    buf.writeIString('')
    buf.writeIString('KFSOWI')
    buf.writeIString('')
    buf.writeIString('4.4.3')
    buf.writeByte(1)
    buf.writeIString('')
    buf.writeIString('15c5b3d6c0ec269c')
    buf.writeIString('es-ES')
    buf.writeByte(1)
    buf.writeByte(0)
    buf.writeIString('')
    buf.writeByte(1)
    buf.writeIString('')
    buf.writeRrsInt32(2)
    buf.writeIString('')
    buf.writeIString('')
    buf.writeIString('')
    buf.writeIString('')
    buf.writeRrsInt32(0)
    buf.writeRrsInt32(0)
    let token = session.account.scidtoken ? Buffer.from(session.account.scidtoken, 'utf8') : ''
    let compressedToken = zlib.deflateSync(token)
    buf.BE()
    buf.writeInt32(4 + compressedToken.length)
    buf.LE()
    buf.writeInt32(token.length)
    buf.append(compressedToken)

    return buf.buffer.slice(0, buf.offset)
}
