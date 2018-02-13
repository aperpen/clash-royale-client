module.exports.run = args => {
    let msg = args.join(' ')
    processor.send(packets.ChatToClan.code, packets.ChatToClan.payload(msg))
}

module.exports.help = {
    'usage': 'chat Message',
    'example': 'chat Hi clan!',
    'description': 'Send a chat message to your clan'
}