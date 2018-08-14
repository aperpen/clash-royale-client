const packets = require('../../')

module.exports.code = 20100

module.exports.callback = session => session.send(packets.Login)
