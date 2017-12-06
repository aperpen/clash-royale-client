const net = require('net')

var client = new net.Socket()

client.connect(1339, '127.0.0.1', () => {
    console.log('✔️ Connected to the server')
    process.stdout.write('> ')
})

client.on('error', () => {
  console.log('✖️ Cannot connect to the server, is the server running?')
  process.exit()
})

client.on('close', () => {
  console.log('ℹ️ Server closed')
  process.exit()
})

client.on('data', payload => {
  let response = JSON.parse(payload.toString())
  switch(response.code){
    case 1:
      console.log(response.text)
      process.stdout.write('> ')
      break;
  }
})

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', input => {
  client.write(input)
  process.stdout.write('> ')
})
