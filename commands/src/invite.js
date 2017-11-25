module.exports.run = args => {
    let tag = args[0].startsWith('#') ? args[0].substr(1) : args[0]
    processor.send(packets.InviteClan.code, packets.InviteClan.payload(tag))
}

module.exports.help = {
    'usage': 'invite #TAG',
    'example': 'invite #2PP',
    'description': 'Invite an user to the current clan (Needs Elder or Co-Leader role)'
}