const Blessed = require('blessed')
const runCmd = require('../commands/index').run

let screen = null
let output = null
module.exports.init = () => {
    screen = Blessed.screen({
        fullUnicode: true
    })
    output = Blessed.log({
        top: 0,
        left: 0,
        height: '100%-3',
        width: '100%',
        keys: true,
        mouse: true,
        scrollable: true,
        scrollbar: {
            ch: ' ',
            bg: 'red'
        },
        border: {
            type: 'line'
        },
        label: ' Log '
    })
    let input = Blessed.textbox({
        bottom: 0,
        left: 0,
        height: 3,
        width: '100%',
        keys: true,
        mouse: true,
        inputOnFocus: true,
        style: {
            fg: 'white',
        },
        border: {
            type: 'line'
        },
        label: ' Input '
    })

    screen.key(['escape', 'C-c'], () => process.exit(0))
    screen.append(output)
    screen.append(input)

    input.on('submit', text => {
        runCmd(text)
        input.clearValue()
        input.focus()
    })

    input.focus()
}

module.exports.log = text => output.log(text)

module.exports.banner = () => console.log(Buffer.from('1b5b33316d2020205f5f5f5f5f5f5f5f5f5f20202020205f5f5f5f5f5f5f5f5f2020202020202020202020205f5f201b5b33396d0d0a1b5b33316d20202f205f5f5f5f2f205f5f205c2020202f205f5f5f5f2f20285f295f5f20205f5f5f5f20202f202f5f1b5b33396d0d0a1b5b33316d202f202f2020202f202f5f2f202f20202f202f2020202f202f202f205f205c2f205f5f205c2f205f5f2f1b5b33396d0d0a1b5b33316d2f202f5f5f5f2f205f2c205f2f20202f202f5f5f5f2f202f202f20205f5f2f202f202f202f202f5f20201b5b33396d0d0a1b5b33316d5c5f5f5f5f2f5f2f207c5f7c2020205c5f5f5f5f2f5f2f5f2f5c5f5f5f2f5f2f202f5f2f5c5f5f2f20201b5b33396d0d0a1b5b33316d2020202020202020202020202020202020202020202020202020202020202020202020202020202020201b5b33396d', 'hex').toString('utf8'))