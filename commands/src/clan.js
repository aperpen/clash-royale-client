module.exports.run = args => {
    let tag = args[0].startsWith('#') ? args[0].substr(1) : args[0]
    processor.send(packets.FetchClan.code, packets.FetchClan.payload(tag))
}

module.exports.help = {
    'usage': 'clan #TAG',
    'example': 'clan #2PP',
    'description': 'Fetch clan'
}