module.exports.run = args => {
    let tag = args.shift()
    tag = tag.startsWith('#') ? tag.substr(1) : tag
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

module.exports.disabled = true