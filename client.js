const net = require('net')
const Packetizer = require('./utils/packetizer')
const consoleUtil = require('./utils/console')
const SaveSession = require('./utils/save')
const config = require('./config')
const session = require('./logic/session')

consoleUtil
  .prompt({
    type: 'list',
    name: 'account',
    message: 'Select account',
    choices: config.credentials.map(account => account.name ? account.name : account.tag),
    pageSize: 10
  })
.then(answers => {
    let saveSession = null
    const packetizer = new Packetizer()
    const gameserver = new net.Socket()

    session.server = gameserver
    session.account = config.credentials.find(account => account.name === answers.account)

    if (process.argv.indexOf('--save') > -1 || process.argv.indexOf('-s') > -1) {
      session.saveSession = new SaveSession(config.savePath)
      console.log('[*] Saving session in', session.saveSession._folder)
    }

    gameserver.connect(9339, 'game.clashroyaleapp.com', () => {
      session.start()
    })

    gameserver.on('data', chunk => {
      packetizer.packetize(chunk, (packet) => {
        let message = {
          code: packet.readUInt16BE(0),
          length: packet.readUIntBE(2, 3),
          payload: packet.slice(7, packet.length)
        }

        session.receive(message)
      })
    })
  })

module.exports.account = {}
