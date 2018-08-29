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

## Getting a token (Android)
#### Requirements
* python3.6
> You will need a rooted device

1. Download [decrypt.py](https://gist.github.com/aperpen/79600a80bf64a9df40a171324c951212) tool
2. Pull storage_new.xml file from your device. Usually it's located in `/data/data/com.supercell.clashroyale/shared_prefs`.
3. Run `python3 decrypt.py storage_new.xml`. Look for `Pass_PROD` key, the value is your token.

Or you can use adb:
`adb pull /data/data/com.supercell.clashroyale/shared_prefs/storage_new.xml D:\some_path`
## Usage
### Installing the client
You can just fork this repository.
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

## Installation
- Run `npm install`
- Rename config.example to config.js and modify your credentials

## Credits
- [iGio90](https://github.com/iGio90) for the new key and **all the amazing contributions he does**
- [dcsposh](https://github.com/dcposch) for blake2b logic ([blakejs](https://github.com/dcposch/blakejs))
- [clugh](https://github.com/clugh) for [documentation of the Clash Royale protocol](https://github.com/clugh/cocdp/wiki/Protocol)
- Contributors of [node-cr-proxy](https://github.com/royale-proxy/node-cr-proxy/) for packetreceiver and bytebuffer-sc libs
