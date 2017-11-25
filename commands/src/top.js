module.exports.run = args => {
    if(args[0] === 'clans')
        processor.send(packets.FetchTopClans.code, packets.FetchTopClans.payload())
    else if(args[0] === 'players'){
        processor.send(packets.FetchTopPlayers.code, packets.FetchTopPlayers.payload())
    }
}

module.exports.help = {
    'usage': 'top players|clans',
    'description': 'Fetches the global clan or players top'
}