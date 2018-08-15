const ByteBuffer = require('../../../../utils/bytebuffer-sc')

module.exports.code = 29467

module.exports.decode = (payload) => {
  buffer = ByteBuffer.fromBinary(payload)

  let json = {}
  json.warId = {
      high: buffer.readInt32(),
      low: buffer.readInt32()
  }

  json.status = buffer.readRrsInt32()
  json.timeStamp = buffer.readInt32()
  json.state = buffer.readRrsInt32()

  json.clans = []

  let clanCount = buffer.readRrsInt32()

  for(let j = 0; j < clanCount; j++) {
      let clan = {
        clanId: buffer.readInt64(),
        warId: buffer.readInt64(),
        clanName: buffer.readIString(),
        battlesLeft: buffer.readRrsInt32(),
        participants: []
      }

      let memberCount = buffer.readRrsInt32()
      for(let i = 0; i < memberCount; i++) {
          let info = {
              id: buffer.readInt64(),
              name: buffer.readIString(),
              battleCount: buffer.readRrsInt32(),
              battlesPlayed: buffer.readRrsInt32(),
              crowns: buffer.readRrsInt32(),
              cardsWon: buffer.readRrsInt32(),
              unk1: buffer.readRrsInt32()
          }
          clan.participants.push(info)
      }

      clan.unk1 = buffer.readRrsInt32()

      let cardCount = buffer.readRrsInt32()
      clan.cards = []

      for(let k = 0; k < cardCount; k++) {
          let card = {}
          card.shortCardId = buffer.readRrsInt32()
          card.level = buffer.readRrsInt32()
          buffer.readRrsInt32() // always -64
          card.count = buffer.readRrsInt32()
          buffer.readRrsInt32() // always 0
          buffer.readRrsInt32() // always 0
          buffer.readRrsInt32() // always 0
          clan.cards.push(card)
      }

      clan.wins = buffer.readRrsInt32()
      clan.unk1 = buffer.readRrsInt32()
      clan.battlesLeft = buffer.readRrsInt32()
      clan.crowns = buffer.readRrsInt32()
      clan.battlesPlayed = buffer.readRrsInt32()
      clan.unk2 = buffer.readRrsInt32()
      clan.warTrophies = buffer.readRrsInt32()
      clan.unk4 = buffer.readRrsInt32() // 00
      clan.unk5 = buffer.readRrsInt32() // 00

      json.clans.push(clan)
  }

  buffer.readRrsInt32()
  json.mode = buffer.readRrsInt32() * 1000000 + buffer.readRrsInt32()
  buffer.readRrsInt32()
  buffer.readRrsInt32()
  buffer.readRrsInt32()
  buffer.readRrsInt32()
  buffer.readRrsInt32()
  json.timeStamp2 = buffer.readInt32()
  buffer.readInt32()
  json.timeStamp3 = buffer.readRrsInt32()
  buffer.readRrsInt32()
  buffer.readRrsInt32()
  buffer.readRrsInt32()

  return json
}
