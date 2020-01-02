IntCode = require('./intcode')

readMap = (instructions, input = []) => {
    let outputs = []
    let output = 0
    let intcode = new IntCode(instructions, input)
    while (!(typeof output === "undefined")){
        output = intcode.run()
        if (!(typeof output === "undefined")){
            // console.log(String.fromCharCode(output), output)
            outputs.push(output)
         }   
    }
    outputs = outputs.map(x => String.fromCharCode(x)).join('').split('\n')
    console.log(outputs)
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

findPointer = mazeMap => {
    x = Math.max(...mazeMap.map(x=>x.indexOf('^')))
    y = mazeMap.map(x=>x.indexOf('^')).indexOf(x)
    return {x:x, y:y, dir:0}
}


move = (pointer) => {
    switch (pointer.dir){
        case 0:
            return {x:pointer.x, y:pointer.y-1, dir:pointer.dir}
        case 1:
            return {x:pointer.x+1, y:pointer.y, dir:pointer.dir}
        case 2:
            return {x:pointer.x, y:pointer.y+1, dir:pointer.dir}
        case 3:
            return {x:pointer.x-1, y:pointer.y, dir:pointer.dir}
    }
}

turn = (mazeMap, pointer, add) => {
    // add = 1 for right, 3 for left, 0 for ahead
    let nextDir = (pointer.dir + add) % 4
    nextMove = move({x:pointer.x, y:pointer.y, dir:nextDir})

    return ((nextMove.x>=0) && 
        (nextMove.y>=0) && 
        (nextMove.y<mazeMap.length) && 
        (nextMove.x<mazeMap[0].length) && 
        (mazeMap[nextMove.y][nextMove.x] === "#"));
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

dir2ptr = ptr => {
    switch(ptr){
        case 0:
            return '^'
        case 1:
            return '>'
        case 2:
            return 'v'
        case 3:
            return '<'
    }
}

traverseMaze = view => {
    view[0] = 2
    let mazeMap = readMap(view)
    let pointer = findPointer(mazeMap)
    let finished = false
    // console.log(mazeMap)
    let moveList = []
    let moves = 0
    while (!finished){

        // move right
        if(turn(mazeMap, pointer, 1)){
            pointer.dir = (pointer.dir + 1) % 4
            moves = 0
            while(turn(mazeMap, pointer, 0)){
                pointer = move(pointer)
                moves += 1
            }
            moveList.push(`R${moves}`)
        }

        // move left
        else if(turn(mazeMap, pointer, 3)){
            pointer.dir = (pointer.dir + 3) % 4
            moves = 0
            while(turn(mazeMap, pointer, 0)){
                pointer = move(pointer)
                moves += 1
            }
            moveList.push(`L${moves}`)
        }

        else {
            finished = true
        }
        mazeMap[pointer.y] = mazeMap[pointer.y].replaceAt(pointer.x, dir2ptr(pointer.dir))
        // console.log(mazeMap)
        // console.log(pointer)
    }
    // console.log(mazeMap)
    return moveList
}
/*
[ 'L6','R12','R8',
  'R8','R12','L12',
  'R8','R12','L12',
  'L6','R12','R8',
  'R12','L12','L4','L4',
  'L6','R12','R8',
  'R12','L12','L4','L4',
  'L6','R12','R8',
  'R12','L12','L4','L4',
  'R8','R12','L12' ]

  A: 'L6', 'R12', 'R8'
  B: 'R8', 'R12', 'L12'
  C: 'R12', 'L12', 'L4', 'L4'
  A, B, B, A, C, A, C, A, C, B
*/

part2 = instructions => {
    instructions[0] = 2
    let outputs = []
    let output = 0
    let fullRoutine = `A,B,B,A,C,A,C,A,C,B\nL,6,R,12,R,8\nR,8,R,12,L,12\nR,12,L,12,L,4,L,4\ny\n`.split('').map(x => x.charCodeAt(0))
    let intcode = new IntCode(instructions, fullRoutine)
    while (!(typeof output === "undefined")){
        output = intcode.run()
        outputs.push(output)
    }
    let final = outputs[outputs.length-2]
    let fs = require('fs')
    outputs = outputs.map(x => String.fromCharCode(x)).join('').split('\n')
    fs.writeFileSync("output.txt", outputs.join('\n'))
    return final
}

module.exports = {alignment : findCrossSectionAlignment}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('input.txt')).toString().split(",").map(val => parseInt(val))

    // part 1
    console.log(findCrossSectionAlignment(readMap(data.slice())))

    // part 2
    console.log(traverseMaze(data.slice()))
    console.log(part2(data.slice()))
}