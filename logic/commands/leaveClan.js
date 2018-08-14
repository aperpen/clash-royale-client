const packets = require('../packets')

module.exports.run = (session, args) => {
  session.send(packets.LeaveClan)
}

module.exports.config = {
  name: 'leaveClan',
  alias: ['l', 'leave']
}

module.exports.help = {
  'usage': 'leave',
  'description': 'Leave current clan'
}
