const packets = require('../packets')

module.exports.run = (session, args) => {
  let tag = args[0].startsWith('#') ? args[0].substr(1) : args[0]
  session.send(packets.FetchClan, { tag: tag })
}

module.exports.config = {
  name: 'clan',
  alias: ['alliance', 'a', 'c']
}

module.exports.help = {
  'usage': 'clan <tag>',
  'example': 'clan #2PP',
  'description': 'Fetch clan stats'
}
