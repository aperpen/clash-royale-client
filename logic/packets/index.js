const fs = require('fs')

let packets = {}

const load = dir => fs.readdir('./logic/packets/' + dir, (err, files) => {
  for (let file of files) {
    let packet = require(`./${dir}/${file}`)
    packets[file] = packets[packet.code] = Object.assign({
      name: file
    }, packet)
  }
})

load('server')
load('client')

module.exports = packets
