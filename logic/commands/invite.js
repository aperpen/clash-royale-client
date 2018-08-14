const packets = require('../packets')

module.exports.run = (session, args) => {
  let tag = args[0].startsWith('#') ? args[0].substr(1) : args[0]
  session.send(packets.InviteClan, { tag: tag })
}

module.exports.config = {
  name: 'invite',
  alias: ['i']
}

module.exports.help = {
  'usage': 'invite <tag>',
  'example': 'invite #2PP',
  'description': 'Invite an user to the current clan (Needs Elder or Co-Leader role)'
}
