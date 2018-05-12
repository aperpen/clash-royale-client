const Processor = require('./packets/processor')

initial = require('./initial.js')

processor = new Processor(initial.server)

initial.screen.init()

initial.prepareServer()
initial.startServer(processor)
