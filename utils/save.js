const fs = require('fs')

class SaveSession {
  constructor(path) {
    this._folder = this.generateFolder(path)
  }

  generateFolder(path) {
    const now = new Date()
    const formattedNow = `${now.getFullYear()}${('0' + (now.getMonth() + 1)).slice(-2)}` +
      `${('0' + now.getDate()).slice(-2)}_${('0' + now.getHours()).slice(-2)}` +
      `${('0' + now.getMinutes()).slice(-2)}${('0' + now.getSeconds()).slice(-2)}`

    let saveFolder = path + '/' + formattedNow
    if (!fs.existsSync(path)) fs.mkdirSync(path)
    fs.mkdirSync(saveFolder)

    return saveFolder
  }

  message(message) {
    let path = `${this._folder}/${message.code}.hex`
    if (fs.existsSync(path)) {
      let savedFiles = fs.readdirSync(this._folder)
        .filter(f => f.indexOf(message.code) > -1)
      path = `${this._folder}/${message.code}-${savedFiles.length}.hex`
    }

    fs.writeFile(path, message.payload, { encoding: 'hex' }, err => console.log)
  }
}

module.exports = SaveSession
