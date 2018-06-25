const nacl = require('sc-tweetnacl')
const Nonce = require('./nonce')

function Crypto() {}

Crypto.prototype.processPacket = (message) => {
  switch (message.code) {
    case 20100:
      this.serverKey = Buffer.from(config.serverKey, 'hex')
      this.keys = nacl.box.keyPair()
      let length = message.payload.readInt32BE()
      this.sessionKey = message.payload.slice(4, 4 + length)

      return message.payload
      break;
    case 20103:
      return message.payload
    case 20677:
      let nonce = this.nonce = new Nonce({
        publicKey: this.keys.publicKey,
        serverKey: this.serverKey,
        bytes: this.snonce.payload
      })

      let decrypted = nacl.box.open.after(message.payload, nonce.payload, this.sharedKey)
      this.sharedKey = Buffer.from(decrypted.slice(24, 56))
      this.rnonce = new Nonce({
        bytes: decrypted.slice(0, 24)
      })
      return decrypted.slice(56)
      break;
    default:
      if (this.rnonce) {
        this.rnonce.increment(2)
        return nacl.box.open.after(message.payload, this.rnonce.payload, this.sharedKey)
      } else return null
      break;
  }
}

Crypto.prototype.encrypt = (code, payload) => {
  if (code === 10100) {
    return payload
  } else if (code === 10101) {
    this.snonce = new Nonce()
    this.nonce = new Nonce({
      publicKey: this.keys.publicKey,
      serverKey: this.serverKey
    })
    this.sharedKey = nacl.box.before(this.serverKey, this.keys.secretKey)
    let crypted = nacl.box.after(Buffer.concat([this.sessionKey, this.snonce.payload, payload]), this.nonce.payload, this.sharedKey)

    return Buffer.concat([this.keys.publicKey, Buffer.from(crypted)])
  }

  this.snonce.increment(2)
  return nacl.box.after(payload, this.snonce.payload, this.sharedKey)
}

module.exports = new Crypto
