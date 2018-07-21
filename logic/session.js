const prettyjson = require('prettyjson')
const Crypto = require('../crypto')
const tag2id = require('../utils/tag2id')
const packets = require('./packets')

class Session {
  constructor() {
    this.crypto = new Crypto
    this._ticks = 0
  }

  get account() {
    return this._account
  }

  set account(account) {
    this._account = account
    this._account.id = tag2id.tag2id(this._account.tag)
  }

  start() {
    this.send(packets.Handshake)
    setInterval(() => {
      this.send(packets.KeepAlive)
    }, 10000)
  }

  send(packet, params = []) {
    let payload = packet.payload(this, params)
    let crypted = this.crypto.encrypt(packet.code, payload)
    let header = Buffer.alloc(7)
    header.writeUInt16BE(packet.code, 0)
    header.writeUIntBE(crypted.length, 2, 3)
    header.writeUInt16BE(packet.version || 0, 5)

    this.server.write(Buffer.concat([header, Buffer.from(crypted)]))
    console.log('📤 ' + (packets[packet.code] && packets[packet.code].name ? packets[packet.code].name : code))
  }

  receive(message) {
    let decrypted = this.crypto.decrypt(message)
    this.parse(message.code, decrypted)
    if (this.saveSession) this.saveSession.message({ code: message.code, payload: decrypted })

    if (message.code === packets.LoginOk.code) setInterval(() => this._ticks += 2, 100)
  }

  parse(code, buffer) {
    console.log('📥 ' + (packets[code] && packets[code].name ? packets[code].name : code))
    if (packets[code] && !packets[code].disabled) {
      let data = null
      if (typeof packets[code].decode == 'function') {
        try {
          data = packets[code].decode(buffer)
          console.log(prettyjson.render(data))
        } catch (e) {
          console.log('✖️ Error decoding ' + code + ' packet')
          console.log(e)
        }
      }
      if (typeof packets[code].callback == 'function') packets[code].callback(this, data)
    }
  }
}

module.exports = new Session
