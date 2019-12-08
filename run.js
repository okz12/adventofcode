const fs_for_exec = require('fs')

let exec = (scriptname) => {
    let data_for_exec = Buffer.from(fs_for_exec.readFileSync(scriptname)).toString()
    eval(data_for_exec)
}

module.exports = exec