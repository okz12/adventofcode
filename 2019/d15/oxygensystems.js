IntCode = require('./intcode')

pts = (obj) => `${obj.x}|${obj.y}`
next_position = (x, y, dir) => {
    switch (dir){
        case 1:
            y++
            break;
        case 2:
            y--
            break;
        case 3:
            x--
            break;
        case 4:
            x++
            break;
    }
    return {x:x, y:y}
}

bfs = (instructions, mode) => {
    let queue = []
    if (mode === 1){
        queue = [{path: [1]}, {path: [2]}, {path: [3]}, {path: [4]}]
    } else {
        queue = [{path: bfs(instructions, 1)}]
    }

    let output = 0
    let visited = new Set()
    let maxpath = []
    while(queue.length>0){
        let next = queue.shift()
        let curr = {x:0, y:0}
        let intcode = new IntCode(instructions.slice(), [])
        for (const dir of next.path){
            curr = next_position(curr.x, curr.y, dir)
            output = intcode.run(dir)
        }
        visited.add(pts(curr))

        // part 2: keep track of longest path
        if (output != 0){
            maxpath = next.path.length > maxpath.length ? next.path : maxpath
        }
        
        // part 1: found oxygen tank
        if ((mode === 1) && (output === 2)){
            return next.path
        }
        if (((mode !== 1) && (output !== 0)) || (output === 1)){
            for (const dir of [1,2,3,4]){
                if (!visited.has(pts(next_position(curr.x, curr.y, dir)))){
                    let new_path = next.path.slice()
                    new_path.push(dir)
                    queue.push({path:new_path})
                }
            }
        }
    }
    return maxpath
}


if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('input.txt')).toString().split(",").map(val => parseInt(val))


    //part 1
    let oxygen_tank = bfs(data, 1)
    console.log(oxygen_tank.length)

    //part 2
    let fill = bfs(data, 2)
    console.log(fill.length)

}