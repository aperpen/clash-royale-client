const packets = require('../packets')

module.exports.run = (session, args) => {
  let tag = args[0].startsWith('#') ? args[0].substr(1) : args[0]
  session.send(packets.FetchProfile, { tag: tag })
}

module.exports.config = {
  name: 'profile',
  alias: ['stats', 'p', 'player']
}

module.exports.help = {
  'usage': 'profile <tag>',
  'example': 'profile #2PP',
  'description': 'Fetch player tag'
}
