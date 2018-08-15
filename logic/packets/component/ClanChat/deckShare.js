module.exports.decode = buffer => {
    let json = {
        cardCount: buffer.readRrsInt32(),
        cards: []
    }

    for(let i = 0; i < json.cardCount; i++) {
        json.cards.push(buffer.readRrsInt32())
    }
    buffer.readRrsInt32()
    json.message = buffer.readIString()
    json.warDeck = buffer.readRrsInt32()

    if(json.warDeck) {
        json.warId = {
            high: buffer.readInt32(),
            low: buffer.readInt32()
        }
    }
}
