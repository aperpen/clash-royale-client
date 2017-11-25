module.exports.run = args => {
    let tag = args.shift()
    tag = tag[0].startsWith('#') ? tag[0].substr(1) : tag[0]
    let msg = args.join(' ')

    processor.send(packets.ExecuteCommand.code, packets.ExecuteCommand.payload([
        {
            name: 'kick',
            params: {
                msg: msg,
                tag: tag
            }
        }
    ]))
}

module.exports.help = {
    'usage': 'kick #TAG reason',
    'example': 'kick #2PP Too noob',
    'description': 'Kick user from current clan (Needs Elder or Co-Leader role)'
}