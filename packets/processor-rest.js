const prettyjson = require('prettyjson')
const crypto = require('../crypto/crypto')
const cnsl = require('../utils/console')

const ServerRest = require('./serverRest/server-rest')


function Processor(server) {
    this.storage = {}

    this.serverRest = new ServerRest(this, this.storage)
    this.serverRest.start()

    this.server = server
}


Processor.prototype = Object.create(require('./processor').prototype)
Processor.prototype.constructor = Processor


Processor.prototype.tryToCall = (target, arg) => {
    if (typeof target == 'function')
        return target(arg)

    return
}

Processor.prototype.parse = function(code, buffer) {
    cnsl.log('📥 ' + (packets[code] && packets[code].name ? packets[code].name : code))

    if (!packets[code] || packets[code].disabled)
        return

    if (typeof packets[code].decode == 'function') {
        try {
            /* Get data from packet */
            let data = packets[code].decode(buffer)

            /* Prepare info for creating key for storage to call callback for response */
            let keyData = ['']
            if (packets[code].name == 'Profile' || packets[code].name == 'Profile' ||
                    packets[code].name == 'ProfileNotFound' || packets[code].name == 'Clan')
                keyData.push(data.tag || '')

            /* Safely call callback for packet if it was requested */
            let keyMaker = this.serverRest.makeKeys[packets[code].name]
            if (keyMaker && typeof keyMaker == 'function') {
                let key = keyMaker(keyData)

                let callback = this.storage[key]
                if (callback && typeof callback == 'function')
                    callback(data)
            }

            /* Call callback if needed */
            if (typeof packets[code].callback == 'function') packets[code].callback(data)
        }catch (e) {
            cnsl.log('✖️ Error decoding ' + code + ' packet\n' + e)
        }
    } else
        if (typeof packets[code].callback == 'function') packets[code].callback()
}

module.exports = Processor
