module.exports.run = args => {
    let tag = args.shift()
    tag = tag[0].startsWith('#') ? tag[0].substr(1) : tag[0]
    let msg = args.join(' ')

    processor.send(packets.RequestJoin.code, packets.RequestJoin.payload(tag, msg))
}

module.exports.help = {
    'usage': 'requestClan #CLANTAG Join message',
    'example': 'requestClan #2PP Hi, i\'m a pro',
    'description': 'Send a request to join a clan'
}