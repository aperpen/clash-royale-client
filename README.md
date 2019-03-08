# clash-royale-client
NodeJS client to connect to Clash Royale servers.

![](https://raw.githubusercontent.com/aperpen/clash-royale-client/master/screenshot.png)

## What can it do?
* Connect and login into Clash Royale servers
* Basic actions:
    - Fetch player and clan stats
    - Get tops
    - Invite to a clan
    - ...

This is a basic client. Now is your turn. Modify the client and add functions to fit it to your requirements.

## Installation
- Run `npm install`
- Rename config.example to config.js and modify your credentials

### Getting a token (Android)
> You will need a rooted device

1. Download [decrypt.js](https://gist.github.com/aperpen/18378731d8ef081c2f940d862ff40754) tool
2. Pull storage_new.xml file from your device. Usually it's located in `/data/data/com.supercell.clashroyale/shared_prefs`.
3. Run `node decrypt.js`. Look for your account in `SCID_PROD_ACCOUNTS` key, the value contains your token.
4. Put your token in `scidtoken` key in config.js

* **KNOWN ISSUE** Client only works with accounts using scid token

## Usage
### Running the client  
```
node index
```

### Using the replay option
If you want to save the packets dumps to replay later run the client with the option `--save` (or `-s`)
```
node index --save
```
Client will save the packets in the folder specified in `config.js`.

Then you can decode again saved messages using the option `--replay` (or `-r`):
```
node index --replay
```
The client has built-in support for save multiple sessions.

### Commands
- Press Alt + C to type a command
- Type 'help' to get started


## Credits
- [iGio90](https://github.com/iGio90) for the new key and **all the amazing contributions he does**
- [dcsposh](https://github.com/dcposch) for blake2b logic ([blakejs](https://github.com/dcposch/blakejs))
- [clugh](https://github.com/clugh) for [documentation of the Clash Royale protocol](https://github.com/clugh/cocdp/wiki/Protocol)
- Contributors of [node-cr-proxy](https://github.com/royale-proxy/node-cr-proxy/) for packetreceiver and bytebuffer-sc libs
