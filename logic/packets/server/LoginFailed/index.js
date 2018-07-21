const ByteBuffer = require('../../../../utils/bytebuffer-sc')
const fs = require('fs')

module.exports.code = 20103

module.exports.decode = (payload) => {
  payload = ByteBuffer.fromBinary(payload)

  let json = {}
  json.code = payload.readRrsInt32()
  if (json.code === 7) {
    json.sha = JSON.parse(payload.readIString()).sha
  } else if(json.code === 10) {
    payload.readIString()
    payload.readIString()
    payload.readIString()
    payload.readIString()
    payload.readIString()
    json.seconds = payload.readRrsInt32()
  }

  return json
}

module.exports.callback = async data => {
  if (data.code === 7) {
    let config = require('../../../config.js')
    config.resourceSha = data.sha
    await fs.writeFileSync('./config.js', 'module.exports = ' + JSON.stringify(config, null, 3))
    console.log('Resource SHA updated after maintenance. Restart the client to log in.')
  } else if(data.code === 10) {
    console.log('Servers are in maintenance. ETA: ', data.seconds)
  } else {
    console.log(`Couldn't log in. Check your credentials.`)
  }
  process.exit()
}
