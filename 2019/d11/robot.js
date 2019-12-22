IntCode = require('./intcode')

pts = (pos) => {return `x:${pos.x} y:${pos.y}`}
stp = (str) => {return {x:parseInt(str.split(' ')[0].split(':')[1]), 
                y:parseInt(str.split(' ')[1].split(':')[1])}}
navigate = (instructions, floor) => {

    turn = (vel, dir) => {return (dir === 1) ? {x: vel.y, y: parseInt(-vel.x)} : {x: parseInt(-vel.y), y: vel.x}}
    // parseInt makes -0s => 0s
    step = (pos, vel) => {return {x: pos.x + vel.x, y: pos.y + vel.y}}

    let intcode = new IntCode(instructions, [])
    let painted = new Set()
    let robot = {pos: {x: 0,y: 0},
        vel: {x: 0,y: 1}}
    let new_color = 0

    let a = 0
    while ((!(typeof new_color === "undefined")) && a<1e5 ){
        a++
        // console.log(floor, robot.pos, pts(robot.pos), floor.has(pts(robot.pos)))
        let color = (pts(robot.pos) in floor) ? floor[(pts(robot.pos))] : 0
        new_color = intcode.run(color)
        let turn_right = intcode.run(-1)
        if (!(typeof new_color === "undefined")){
            floor[(pts(robot.pos))] = new_color
            painted.add(pts(robot.pos))

            robot.vel = turn(robot.vel, turn_right)
            robot.pos = step(robot.pos, robot.vel)
        }
        // console.log(`current color: ${color}, color to paint: ${new_color}, turn right: ${turn_right}, position: x:${robot.pos.x} y:${robot.pos.y}, velocity: x:${robot.vel.x} y:${robot.vel.y}, \n==================`)
    }
    console.log(`Painted Size: ${painted.size}`)
    visualize(floor)
}

visualize = floor => {
    all_points = Object.keys(floor).map(stp)
    max_x = Math.max(...all_points.map(pt => pt.x))
    min_x = Math.min(...all_points.map(pt => pt.x))
    max_y = Math.max(...all_points.map(pt => pt.y))
    min_y = Math.min(...all_points.map(pt => pt.y))
    // console.log(max_x, min_x, max_y, min_y)
    for (y = max_y; y >= min_y; y--){
        line = new Array()
        for(x = min_x; x<=max_x; x++){
            if ((pts({x:x, y:y}) in floor) && (floor[pts({x:x, y:y})] === 1)){
                line.push('*')
            } else {
                line.push(' ')
            }
        }
        console.log(line.join(''))
    }
}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('d11.txt')).toString().split(",").map(val => parseInt(val))
    // part 1
    navigate(data, {})

    // part 2
    floor = {}
    floor[pts({x:0, y:0})] = 1
    navigate(data, floor)
  }