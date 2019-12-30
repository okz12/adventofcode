IntCode = require('./intcode')

readMap = instructions => {
    let outputs = []
    let output = 0
    let intcode = new IntCode(instructions, [])
    while (!(typeof output === "undefined")){
        output = intcode.run()
        if (!(typeof output === "undefined")){
            console.log(String.fromCharCode(output), output)
            outputs.push(output)
         }   
    }
    outputs = outputs.map(x => String.fromCharCode(x)).join('').split('\n')
    // while(outputs[outputs.length-1] === ''){
    //     outputs.pop()
    // }
    while(outputs[0].length != outputs[outputs.length-1].length){
        outputs.pop()
    }
    return outputs
}

isCrossSection = (view, x, y) => {
    return (view[y][x] === "#" && view[y+1][x] === "#" && view[y-1][x] === "#" && view[y][x+1] === "#" && view[y][x-1] === "#")
}

findCrossSectionAlignment = view => {
    let alignment = 0
    for (let y = 1; y < view.length -1; y++){
        for (let x = 1; x < view[0].length -1; x++){
            if (isCrossSection(view, x, y)){
                alignment+= x*y
            }
        }
    }
    return alignment
}

module.exports = {alignment : findCrossSectionAlignment}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('input.txt')).toString().split(",").map(val => parseInt(val))

    // part 1
    console.log(findCrossSectionAlignment(readMap(data.slice())))

    // part 2
    data2 = data.slice()
    data2[0] = 2
    console.log(readMap(data2.slice()))
}