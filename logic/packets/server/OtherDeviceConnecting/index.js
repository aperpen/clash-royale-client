module.exports.code = 25483

module.exports.callback = () => {
  console.log('Another device is connecting to this account. Exiting...')
  process.exit(0)
}
