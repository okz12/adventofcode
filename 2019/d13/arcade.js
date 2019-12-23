IntCode = require('./intcode')

arrSum = arr => arr.reduce((a,b) => a + b, 0)
blocks_count = (outputs) => arrSum((outputs.filter((element, index) => {
    return (((index +1) %3 === 0) && (element === 2))
})).map(x => Math.sign(x)))

arcade = (instructions) => {
    let intcode = new IntCode(instructions, [])
    let output = 0
    let outputs = []
    while ((!(typeof output === "undefined"))){
        output = intcode.run()
        if (!(typeof output === "undefined")){
            outputs.push(output)
        }
    }
    // visualize(outputs)
    return outputs
}

play = (instructions) => {
    let num_blocks = blocks_count(arcade(data.slice()))
    instructions[0] = 2
    let intcode = new IntCode(instructions, [])
    let output = 0
    let outputs = []
    let loop = 0
    let input = undefined
    let ball_x = undefined
    let paddle_x = undefined
    let score = 0
    


    while (num_blocks >= 0){
        // console.log("HERE")
        x = intcode.run(input)
        y = intcode.run()
        t = intcode.run()

        

        // outputs.push(x)
        // outputs.push(y)
        // outputs.push(t)

        if (t === 4){
            ball_x = x
            
        }
        if (t === 3){
            paddle_x = x
        }
        
        if ((x === -1) && (y === 0)){
            score = t
            num_blocks -= 1
            // console.log("==========")
            // console.log(`score: ${score}`)
            // console.log(`ball_x: ${ball_x}`)
            // console.log(`paddle_x: ${paddle_x}`)
            // console.log(`num_blocks: ${num_blocks}`)
            // console.log("==========")
            // console.log(intcode.inputs)
        }

        if ((typeof(ball_x) === "undefined") || (typeof(paddle_x) === "undefined")){
            input = undefined
        } else {
            input = parseInt(Math.sign(ball_x - paddle_x))
        }
        loop++
    }
    return score
}

visualize = (outputs) => {
    X = outputs.filter((element, index) => {return (index % 3 === 0)})
    Y = outputs.filter((element, index) => {return ((index + 2) % 3 === 0)})
    T = outputs.filter((element, index) => {return ((index + 1) % 3 === 0)})
    MAX_X = Math.max(...X) - Math.min(...X)
    MAX_Y = Math.max(...Y) - Math.min(...Y)

    let paddle_x = 0
    let ball_x = 0
    let score = 0

    grid = Array()
    for (let i = 0; i < MAX_Y + 1; i ++){
        grid.push(Array(MAX_X+ 2).join(' ').split(''))
    }

    points = [' ', '-', '#', '_', 'O']

    for (let idx = 0; idx < X.length; idx ++){
        x = X[idx]
        y = Y[idx]
        t = T[idx]

        if (t === 4){
            ball_x = x
            
        }
        if (t === 3){
            paddle_x = x
        }
        
        if ((x === -1) && (y === 0)){
            score = t
        } else {
            grid[y][x] = points[t]
        }
    }
    console.log(`score: ${t}`)
    console.log(`ball_x: ${ball_x}`)
    console.log(`paddle_x: ${paddle_x}`)

    for (let g = 0; g<grid.length; g++){
        console.log(grid[g].join(''))
    }
}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('d13.txt')).toString().split(",").map(val => parseInt(val))

    //part 1
    console.log(blocks_count(arcade(data.slice())))

    //part2
    console.log(play(data))
  }