module.exports.run = args => {
    let tag = args.shift()
    tag = tag.startsWith('#') ? tag.substr(1) : tag
    let msg = args.join(' ')

    processor.send(packets.RequestJoin.code, packets.RequestJoin.payload(tag, msg))
}

module.exports.help = {
    'usage': 'requestClan #CLANTAG Join message',
    'example': 'requestClan #2PP Hi, i\'m a pro',
    'description': 'Send a request to join a clan'
}