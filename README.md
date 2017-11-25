# clash-royale-client
NodeJS client to connect to Clash Royale servers.

![](https://raw.githubusercontent.com/aperpen/clash-royale-client/master/screenshot.png)

## What can it do?
* Connect and login into Clash Royale servers
* Encrypt packets to send them to the servers
* Decrypt server packets
* Basic actions:
    - Request clan join
    - Invite to clan and kick from clan
    - Get user stats
    - Get tops
    - ...

This is a basic client. Now is your turn. Modify the client and add functions to fit it to your requirements.


## Usage
### Running the client  
```npm run client```

Client has a built-in server that allows to controll it through commands:
### Running commands service
- Run cmd client: ```npm run cmd```
- Type 'help' to get started

Note that you must start client before run the commands service


## Installation
### Prerequisites
* Install [node-gyp](https://github.com/nodejs/node-gyp)

### Install
- Run `npm install`
- Rename config.example to config.js and modify your credentials

