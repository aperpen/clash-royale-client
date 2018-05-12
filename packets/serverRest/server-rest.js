const http = require('http')

const runCmd = require('../../commands/index').run
const cnsl = require('../../utils/console')
const prepare = require('./server-rest-prepare')

const port = 5487


function Endpoint(pattern, prepare, makeKey, makeCommand){
    this.pattern = pattern
    this.prepare = prepare

    this.makeKey = makeKey
    this.makeCommand = makeCommand
}

function ServerRest(processor, storage) {
    this.processor = processor
    this.storage = storage

    this.endpoints = [
        new Endpoint(
            /profile\/(.*)/, prepare.prepare_profile,
            (m) => "p" + m[1],
            (m) => "profile " + m[1],
        ),
        new Endpoint(/top\/players/, prepare.prepare_top_players,
            (m) => "tp",
            (m) => "top players",
        ),
        new Endpoint(/top\/clans/, prepare.prepare_top_clans,
            (m) => "tc",
            (m) => "top clans",
        ),
        new Endpoint(/clan\/(.*)/, prepare.prepare_clan,
            (m) => "c" + m[1],
            (m) => "clan " + m[1],
        )
    ]

    this.makeKeys = {
        "Profile": this.endpoints[0].makeKey,
        "ProfileNotFound": this.endpoints[0].makeKey,
        "TopPlayers": this.endpoints[1].makeKey,
        "TopClans": this.endpoints[2].makeKey,
        "Clan": this.endpoints[3].makeKey,
    }

    cnsl.log("Available rest endpoints:\n - /profile/<TAG>\n - /clan/<TAG>\n - /top/players\n - /top/players\n")
}

ServerRest.prototype.error = (resp, code=500, reason="Unknown") => {
    resp.writeHead(code, {'Content-Type': 'application/json'})
    resp.end(`{"status": ${code}, "message": "${reason}"}`)
}

ServerRest.prototype.start = function start() {
    this.server = http.createServer((request, response) => {
        for (var i = 0; i < this.endpoints.length; i++) {
            var endpoint = this.endpoints[i]

            /* Check url */
            let match = endpoint.pattern.exec(request.url)
            if (!match) continue

            /* Prepare callback for returning resutls */
            this.storage[endpoint.makeKey(match)] = (data) => {
                if (!data)
                    return this.error(response, 500, "No data found!")

                let resData = endpoint.prepare(data)

                if (resData.status != 200)
                    return this.error(response, resData.status || 500, resData.message || "Unknown")

                response.writeHead(200, {'Content-Type': 'application/json'})
                response.end(JSON.stringify(resData))
            }

            /* Handle timeouts */
            setTimeout(() => {
                return this.error(response, 503, "No response")
            }, 10000) /* 22 sec */

            return runCmd(endpoint.makeCommand(match))
        }

        /* Endpoint not found */
        return this.error(response, 404, "Page not found!")
    }).listen(port, (err) => {
      if (err) { return cnsl.log('Error', err) }
      cnsl.log("Server is listening on port " + port + '\n')
    })
}

module.exports = ServerRest
