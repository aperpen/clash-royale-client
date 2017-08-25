module.exports = {
    code: 10100,
    payload: () => {
        let buf = ByteBuffer.allocate(72)

        buf.writeInt32(1)
        buf.writeInt32(11)
        buf.writeInt32(3)
        buf.writeInt32(1)
        buf.writeInt32(377)
        buf.writeIString(config.resourceSha)
        buf.writeInt32(2)
        buf.writeInt32(2)
        return buf.buffer
    }
}