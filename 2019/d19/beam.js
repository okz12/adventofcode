IntCode = require('./intcode')

readPoint = (instructions, x, y) => {
    let intcode = new IntCode(instructions.slice(), [x,y])
    return (intcode.run() === 1)? "#" : "."
}

readMap = (instructions, lim) => {
    let lines = []
    for (let y = 0; y < lim; y++){
        let line = ''
        for (let x = 0; x < lim; x++){
            line += readPoint(instructions, x, y)
        }
        lines.push(line)
    }
    return lines
}
arrSum = arr => arr.reduce((a,b) => a + b, 0)
beamCount = instructions => {
    let beamMap = readMap(instructions.slice(), 50)
    return arrSum(beamMap.map(line => arrSum(line.split('').map(x => x==='#'?1:0))))
}

isSquare = (instructions, x, y, size) => {return ((readPoint(instructions, x, y) === "#") 
                                        && (readPoint(instructions, x, y+size-1) === "#") 
                                        && (readPoint(instructions, x+size-1, y) === "#") 
                                        && (readPoint(instructions, x+size-1, y+size-1) === "#"))}
findSpace = instructions => {
    let x = 0
    let y = 100
    let start_x = 0
    let found_in_line = false

    while(true){
        // console.log(x, y, readPoint(instructions, x, y))
        if (readPoint(instructions, x, y) === "#"){
            if (!found_in_line){
                start_x = x
                found_in_line = true
            }
            x++


            if (readPoint(instructions, x+99, y) === "#"){
                if (readPoint(instructions, x, y+99) === "#"){
                    return 10000 * x + y
                }
            } else {
                // if x + 100 is not #, go to next line
                y++
                x = start_x
                found_in_line = false
            }
            
        } else {
            x++
            if (found_in_line){
                y++
                x = start_x
                found_in_line = false
            }
        }


    }
}


if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('input.txt')).toString().split(",").map(val => parseInt(val))

    //part 1
    console.log(beamCount(data.slice()))

    //part 2
    console.log(findSpace(data.slice()))


}