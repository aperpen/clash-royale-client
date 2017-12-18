const ByteBuffer = require('../../../utils/bytebuffer-sc')
const tag2id = require('../../../utils/tag2id')
// NOT WORKING YET
module.exports.code = 18688
module.exports.payload = args => {
    let buf = ByteBuffer.allocate(500)
    buf.writeRrsInt32(config.ticks)
    buf.writeRrsInt32(config.checksum)
    buf.writeRrsInt32(1) // COMMAND COUNT
    args.forEach(arg => {
        commands[arg.name](buf, arg.params)
    })
    return buf.buffer.slice(0, buf.offset)
}

const commands = {}

commands.kick = (buf, params) => {
    buf.writeRrsInt32(514) // COMMAND ID

    let tick = config.ticks
    buf.writeRrsInt32(tick - 2)
    buf.writeRrsInt32(tick - 2)

    buf.writeRrsInt32(config.account.id.high)
    buf.writeRrsInt32(config.account.id.low)
    buf.writeIString(params.msg)

    let id = tag2id.tag2id(params.tag)
    buf.writeInt32(id.high)
    buf.writeInt32(id.low)
    buf.writeIString('')
}

commands.joinClan = (buf, params) => {
    buf.writeRrsInt32(206) // COMMAND ID
    let id = tag2id.tag2id(params.tag)
    buf.writeInt32(id.high)
    buf.writeInt32(id.low)
    buf.writeIString(params.clanName)
    buf.writeByte(16)
    buf.writeByte(59)
    buf.writeByte(0)
    buf.writeByte(3)

    let tick = config.ticks
    buf.writeRrsInt32(tick - 2)
    buf.writeRrsInt32(tick - 2)

    buf.writeRrsInt32(config.account.id.high)
    buf.writeRrsInt32(config.account.id.low)

    buf.writeIString('')
    console.log(buf.buffer.slice(0, buf.offset).toString('hex'))
}