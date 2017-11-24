const ByteBuffer = require('../../../utils/bytebuffer-sc')
const fs = require('fs')
module.exports.code = 20103

module.exports.decode = (payload) => {
  payload = ByteBuffer.fromBinary(payload)

  let json = {}
  json.code = payload.readRrsInt32()
  let resource = payload.readIString()
  if (json.code === 7) {
    json.sha = JSON.parse(resource).sha

    return json
  }
  payload.readIString()
  payload.readIString()
  payload.readIString()
  json.reason = payload.readIString()
  json.maintenanceSeconds = payload.readRrsInt32()
  return json
}

module.exports.callback = async data => {
  if (data.code === 7) {
    config.resourceSha = data.sha
    await fs.writeFileSync('./config.js', 'module.exports = ' + JSON.stringify(config, null, 3))
    console.log('Resource SHA updated after maintenance. Restart the client to log in.')
  }
}