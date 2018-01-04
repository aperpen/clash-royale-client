module.exports.run = args => {
    let tag = args[0].startsWith('#') ? args[0].substr(1) : args[0]
    processor.send(packets.FetchTournament.code, packets.FetchTournament.payload(tag))
}

module.exports.help = {
    'usage': 'tourney #TAG',
    'example': 'tourney #2PP',
    'description': 'Fetch stats from given tournament'
}