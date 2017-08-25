const nacl = require('tweetnacl')
const blake2 = require('blake2')

function Nonce(arg) {
    if (arg !== undefined && arg.publicKey) {
        let b2 = blake2.createHash('blake2b', {
            digestLength: 24
        })
        if (arg.bytes) {
            b2.update(arg.bytes);
        }
        b2.update(arg.publicKey)
        b2.update(arg.serverKey)

        this.payload = b2.digest()
    } else if (arg !== undefined && arg.bytes) {
        this.payload = Buffer.from(arg.bytes, 'hex')
    } else {
        this.payload = new Buffer(nacl.randomBytes(nacl.box.nonceLength))
    }
}

Nonce.prototype.increment = function (increment) {
    let val = this.payload.readInt16LE(0)
    val = val % 32767
    this.payload.writeInt16LE(val + increment, 0)
}

module.exports = Nonce