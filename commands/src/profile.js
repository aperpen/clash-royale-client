module.exports.run = args => {
    let tag = args[0].startsWith('#') ? args[0].substr(1) : args[0]
    processor.send(packets.FetchProfile.code, packets.FetchProfile.payload(tag))
}

module.exports.help = {
    'usage': 'profile #TAG',
    'example': 'profile #2PP',
    'description': 'Fetch stats from given tag'
}