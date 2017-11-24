const tag2id = require('../../../utils/tag2id')
const ByteBuffer = require('../../../utils/bytebuffer-sc')

module.exports = {
  code: 24113,
  decode: (payload) => {
    let buf = ByteBuffer.fromBinary(payload)

    let json = {}

    buf.readRrsInt32()
    buf.readRrsInt32()
    buf.readRrsInt32()

    json.deckCards = []
    for (let i = 0; i <= 7; i++) {
      let card = {}
      card.id = buf.readRrsInt32()
      card.level = buf.readRrsInt32()
      buf.readRrsInt32()
      card.count = buf.readRrsInt32()
      buf.readRrsInt32()
      buf.readRrsInt32()
      buf.readRrsInt32()
      json.deckCards.push(card)
    }

    json.id = buf.readInt64()
    json.tag = tag2id.id2tag(json.id.high, json.id.low)

    let unk = buf.readRrsInt32()
    if(unk){
        buf.readRrsInt32()
        buf.readRrsInt32()
    }

    let seasonResultsCount = buf.readRrsInt32()
    json.seasons = []
    for (let i = 0; i < seasonResultsCount; i++) {
        json.seasons[i] = {}
        buf.readRrsInt32() // ID ?
        json.seasons[i].record = buf.readRrsInt32()
        json.seasons[i].result = buf.readRrsInt32()
        buf.readRrsInt32() // RANK
        buf.readRrsInt32()
    }
    buf.readByte()
    
    // 3x RRSLONG id
    for (let i = 0; i <= 2; i++) {
      buf.readRrsInt32()
      buf.readRrsInt32()
    }
    json.name = buf.readIString()
    buf.readByte() // NAME CHANGES

    json.arena = buf.readByte()
    json.trophies = buf.readRrsInt32()

    buf.readRrsInt32()
    buf.readRrsInt32()

    json.legendTrophies = buf.readRrsInt32()
    json.seasonRecord = buf.readRrsInt32()

    buf.readRrsInt32()

    json.bestSeason = {
      rank: buf.readRrsInt32(),
      trophies: buf.readRrsInt32()
    }

    buf.readByte()
    buf.readByte()

    json.previousSeason = {
      rank: buf.readRrsInt32(),
      trophies: buf.readRrsInt32(),
      highest: buf.readRrsInt32()
    }

    buf.readRrsInt32()
    buf.readByte()
    buf.readByte()

    let componentLength = buf.readRrsInt32()
    for (let i = 0; i < componentLength; i++) {
      buf.readByte()
      let statId = buf.readByte()
      let value = buf.readRrsInt32()
      switch (statId) {
        case 1:
          json.gold = value
          break
        case 2:
          json.wonChests = value
          break
        case 12:
          json.superMagicalChest = value ? value - json.wonChests : -1
          break
        case 14:
          json.dailyRewards = value
          break
        case 15:
          json.legendaryChest = value ? value - json.wonChests : -1
          break
        case 16:
          json.shopRestarts = value
          break
        case 17:
          json.shopLegendaryChest = (value - json.shopRestarts > 0) ? value - json.shopRestarts : -1
          break
        case 18:
          json.shopEpicChest = (value - json.shopRestarts > 0) ? value - json.shopRestarts : -1
          break
        case 19:
          json.shopArenaPack = value
          break
        case 22:
          json.epicChest = value ? value - json.wonChests : -1
          break
      }
    }
    json.cyclePosition = json.wonChests % 240

    buf.readRrsInt32()
    componentLength = buf.readRrsInt32()
    for (let i = 0; i < componentLength; i++) {
      buf.readByte()
      buf.readByte()
      buf.readRrsInt32()
    }
    componentLength = buf.readRrsInt32()
    for (let i = 0; i < componentLength; i++) {
      buf.readByte()
      buf.readByte()
      buf.readRrsInt32()
    }

    componentLength = buf.readRrsInt32()
    for (let i = 0; i < componentLength; i++) {
      buf.readByte()
      let statId = buf.readByte()
      let value = buf.readRrsInt32()
      switch (statId) {
        case 6:
          json.record = value
          break
        case 7:
          json.threeCrownWins = value
          break
        case 8:
          json.cardsFound = value
          break
        case 9:
          json.favouriteCard = value
          break
        case 10:
          json.donations = value
          break
        case 21:
          json.challengeCards = value
          break
      }
    }

    componentLength = buf.readRrsInt32()
    for (let i = 0; i < componentLength; i++) {
      buf.readRrsInt32()
      buf.readRrsInt32()
      buf.readRrsInt32()
    }
    if ((buf.readByte())) {
      buf.readRrsInt32()
      buf.readByte()
      buf.readByte()
    }
    buf.readByte()

    json.gems = buf.readRrsInt32()
    buf.readRrsInt32() // GEMS AGAIN
    json.exp = buf.readRrsInt32()
    json.level = buf.readRrsInt32()

    buf.readRrsInt32()

    if (buf.readByte() === 9) {
      json.clan = {
        tag: tag2id.id2tag(buf.readRrsInt32(), buf.readRrsInt32()),
        name: buf.readIString(),
        badge: buf.readRrsInt32(),
        role: buf.readByte()
      }
    } else {
      json.clan = false
    }
    json.battles = buf.readRrsInt32()
    json.tourneBattles = buf.readRrsInt32()

    buf.readRrsInt32()

    json.wins = buf.readRrsInt32()
    json.loses = buf.readRrsInt32()
    return json
  }
}
