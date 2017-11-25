module.exports.run = args => {
    processor.send(packets.LeaveClan.code, packets.LeaveClan.payload())
}

module.exports.help = {
    'usage': 'leaveClan',
    'description': 'Leave current clan'
}