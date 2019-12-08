const fs = require('fs')

var data = Buffer.from(fs.readFileSync('d3.txt')).toString().split("\n")
var wire1_moves = data[0].split(",")
var wire2_moves = data[1].split(",")

function get_x(location){return parseInt(location.split(".")[0])}
function get_y(location){return parseInt(location.split(".")[1])}
function store(x, y){return x + "." + y}
function manhattan(location){return Math.abs(get_x(location))+ Math.abs(get_y(location))}

function move(wire_moves){
    let wire = new Set()
    let location = store(0, 0)
    let step = 0
    let loc_step = {}


    for (const move of wire_moves){
        let direction = move[0]
        let distance = parseInt(move.slice(1))

        for(let i = 0; i < distance; i++){
            step += 1
            x = get_x(location)
            y = get_y(location)
            switch(direction){
                case "R":
                    x += 1
                    break;
                case "L":
                    x -= 1
                    break;
                case "U":
                    y += 1
                    break;
                case "D":
                    y -= 1
                    break;
                default:
                    throw "Error - dir not correct: " + direction
                }
            location = store(x, y)
            if (!(location in loc_step)){
                loc_step[location] = step
            }
            wire.add(location)
            }
    }

    return [wire, loc_step]
}

function closest_manhattan(w1, w2){
    const [w1_set, w1_step]  = move(w1)
    const [w2_set, w2_step] = move(w2)
    let intersection = new Set(Array.from(w2_set).filter(x => w1_set.has(x)))
    // console.log(intersection)
    // console.log(Array.from(intersection).map(manhattan))
    console.log(Math.min(...Array.from(intersection).map(manhattan)))
    console.log(Math.min(...Array.from(intersection).map(function (loc){
        return w1_step[loc] + w2_step[loc]
    })))
    console.log("===")
}

w1 = "R8,U5,L5,D3".split(",")
w2 = "U7,R6,D4,L4".split(",")
closest_manhattan(w1, w2)

w1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72".split(",")
w2 = "U62,R66,U55,R34,D71,R55,D58,R83".split(",")
closest_manhattan(w1, w2)

w1 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51".split(",")
w2 = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7".split(",")
closest_manhattan(w1, w2)

closest_manhattan(wire1_moves, wire2_moves)