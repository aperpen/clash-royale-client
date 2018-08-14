const packets = require('../packets')

module.exports.run = (session, args) => {
  let tag = args.shift()
  tag = tag.startsWith('#') ? tag.substr(1) : tag
  let msg = args.join(' ')

  session.send(packets.RequestJoin, { tag: tag, msg: msg })
}

module.exports.config = {
  name: 'requestClan',
  alias: ['r', 'request']
}

module.exports.help = {
  'usage': 'request <tag> [message]',
  'example': 'requestClan #2PP Hi, i\'m a pro',
  'description': 'Send join request to a clan'
}
