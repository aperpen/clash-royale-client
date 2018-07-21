const packets = require('../packets')

module.exports.run = (session, args) => {
  if (args[0] === 'clans') session.send(packets.FetchTopClans)
  else if (args[0] === 'players') session.send(packets.FetchTopPlayers)
}

module.exports.config = {
  name: 'top',
  alias: ['t']
}

module.exports.help = {
  'usage': 'top <players|clans>',
  'description': 'Fetch global tops'
}
