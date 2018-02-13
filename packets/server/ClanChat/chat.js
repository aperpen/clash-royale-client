module.exports.decode = buffer => {
    return { message: buffer.readIString() }
}