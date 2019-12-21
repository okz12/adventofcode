let IntCode = require('./intcode.js')

sensorboost = (instructions, inputs) => {
    let outputs = []
    let output = 0
    intcode = new IntCode(instructions, inputs)
    while (!(typeof output === "undefined")){
        output = intcode.run()
        if (!(typeof output === "undefined")){
            outputs.push(output)
         }   
    }
    return outputs
}

module.exports = sensorboost

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('d9.txt')).toString().split(",").map(val => parseInt(val))

    // part 1
    console.log(sensorboost(data, [2]))

    // part 2
  }