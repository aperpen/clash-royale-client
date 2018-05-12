const Processor = require('./packets/processor-rest')

initial = require('./initial.js')

processor = new Processor(initial.server)

initial.prepareServer()
initial.startServer(processor)
