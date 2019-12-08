data = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2".split("\n")

const fs = require("fs")
data = fs.readFileSync("d3.txt").toString().split("\n")

function extract(str){
    let s = str.split("@")[1]
    let pos = s.split(":")[0]
    let box = s.split(":")[1]
    let id = str.split("@")[0].slice(0)

    let pos_x = parseInt(pos.split(",")[0])
    let pos_y = parseInt(pos.split(",")[1])
    let box_x = parseInt(box.split("x")[0])
    let box_y = parseInt(box.split("x")[1])

    return {id: id, pos_x: pos_x, pos_y: pos_y, box_x: box_x, box_y: box_y}
}

let visited = {}
let id_area = {}
let id_counts = {"X" : 0}

for (const square of data){
    coordinates = extract(square)
    id_area[coordinates.id] = coordinates.box_x * coordinates.box_y
    id_counts[coordinates.id] = 0
    for (let x = coordinates.pos_x; x < coordinates.pos_x + coordinates.box_x; x++){
        for (let y = coordinates.pos_y; y < coordinates.pos_y + coordinates.box_y; y++){
            co_str = x + "." + y
            if (co_str in visited){
                visited[co_str] = "X"
            } else {
                visited[co_str] = coordinates.id
            }
        }
    }
}

for (const co_str in visited){
    id_counts[visited[co_str]] += 1
}

console.log(id_counts["X"])
for (const id in id_area){
    if (id_counts[id] === id_area[id]){
        console.log(id)
    }
}