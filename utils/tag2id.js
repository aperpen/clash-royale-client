const Long = require('long')
var tagChars = '0289PYLQGRJCUV'

module.exports = {
  tag2id: (tag) => {
    if (tag === undefined || typeof tag !== 'string') return false

    let id = 0
    let tagArray = tag.split('')
    for (let a = 0; a < tagArray.length; a++) {
      let i = tagChars.indexOf(tagArray[a])
      id *= 14
      id += i
    }
    let high = id % 256
    // let low = (id - high) >>> 8
    let low = Long.fromNumber((id - high)).shiftRight(8).low
    return {
      high: high,
      low: low
    }
  },

  id2tag: (high, low) => {
    // let id = ((low << 8) >>> 0) + high
    let id = parseInt(Long.fromNumber(low).shiftLeft(8).shiftRight(0).toString()) + high
    let i = 0
    let tag = []
    while (id > 0) {
      i = id % 14
      id = Math.floor(id / 14)
      tag.push(tagChars.charAt(i))
    }

    return tag.reverse().join('')
  }
}
