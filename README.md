# clash-royale-client
NodeJS client to connect to Clash Royale servers.

![](https://raw.githubusercontent.com/aperpen/clash-royale-client/master/screenshot.png)

## Features
* Connect and login into Clash Royale servers
* Encrypt packets to send them to the servers
* Decrypt server packets
* Basic actions:
    - Request clan join
    - Invite to clan and kick from clan
    - Get user stats
    - Get tops
    - ...
* Basic HTTP REST server

**This is a basic client. Now is your turn. Modify the client and add functions to fit it to your requirements.**

## Usage
### Running the client
```
npm run client
```

Type 'help' in running client to find out what you can do.

### Running the HTTP REST server
```
npm run rest
```
Available rest endpoints:
 - `/profile/<TAG>`
 - `/clan/<TAG>`
 - `/top/players`
 - `/top/players`

## Installation
- Install all required NodeJS modules
```
npm install
```
- Rename `config.example` to `config.js` and modify your credentials

## Credits
- [iGio90](https://github.com/iGio90) for the new key and **all the amazing contributions he does**
- [dcsposh](https://github.com/dcposch) for blake2b logic ([blakejs](https://github.com/dcposch/blakejs))
- [clugh](https://github.com/clugh) for [documentation of the Clash Royale protocol](https://github.com/clugh/cocdp/wiki/Protocol)

- Contributors of [node-cr-proxy](https://github.com/royale-proxy/node-cr-proxy/) for packetreceiver and bytebuffer-sc libs
