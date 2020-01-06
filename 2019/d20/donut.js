pt2str = (obj) => `${obj.x}|${obj.y}`
str2pt = (str) => {return {x:parseInt(str.split('|')[0]), y:parseInt(str.split('|')[1])}}
isAlphabet = (str) => (str.charCodeAt(0) >= 65) && (str.charCodeAt(0) <= 90)
addToPortals = (id, dotx, doty, portals, adjGraph) => {
    // console.log(id, dotx, doty)
    if (portals.hasOwnProperty(id)){
        // console.log(id, portals[id], {x:dotx, y:doty})
        adjGraph[pt2str(portals[id])].push(pt2str({x:dotx, y:doty}))
        adjGraph[pt2str({x:dotx, y:doty})].push(pt2str(portals[id]))
    } else {
        portals[id] = {x:dotx, y:doty}
    }
}
isOutside = (maze, ptr) => ((ptr.y < 4) || (ptr.y > maze.length-4) || (ptr.x < 4) || (ptr.x > maze[0].length - 4))
addSide = (inside, outside, dotx, doty, lines) => {
    if (isOutside(lines, {x:dotx, y:doty})){
        outside.add(pt2str({x:dotx, y:doty}))
    } else {
        inside.add(pt2str({x:dotx, y:doty}))
    }
}
parseMap = mazeMap => {
    let lines = mazeMap.split('\n')
    let adjGraph = {}

    // read graph
    console.log(lines)

    for (let y = 2; y < lines.length-2; y++){
        for (let x = 2; x < lines[0].length-2; x++){
            if (lines[y][x] === '.'){

                let neighbours = new Array()
                if (lines[y+1][x] === '.'){
                    neighbours.push(pt2str({x:x, y:y+1}))
                }
                if (lines[y][x+1] === '.'){
                    neighbours.push(pt2str({x:x+1, y:y}))
                }
                if (lines[y-1][x] === '.'){
                    neighbours.push(pt2str({x:x, y:y-1}))
                }
                if (lines[y][x-1] === '.'){
                    neighbours.push(pt2str({x:x-1, y:y}))
                }

                adjGraph[pt2str({x:x, y:y})] = neighbours

            }
        }
    }

    // 2 read portals
    // vertical reads 
    let portals = {}
    let id = ""
    let inside = new Set()
    let outside = new Set()
    let dotx = 0
    let doty = 0
    for (let y = 0; y < lines.length; y++){
        for (let x = 0; x < lines[0].length; x++){
            if (isAlphabet(lines[y][x])){
                dotx = x
                doty = y

                // V
                if ((y+2<lines.length) && (isAlphabet(lines[y+1][x])) && (lines[y+2][x] == ".")){
                    id = lines[y][x] + lines[y+1][x]
                    doty = y+2
                    addToPortals(id, dotx, doty, portals, adjGraph)
                    addSide(inside, outside, dotx, doty, lines)
                }

                // ^
                if ((y-2>=0) && (isAlphabet(lines[y-1][x])) && (lines[y-2][x] == ".")){
                    id = lines[y-1][x] + lines[y][x]
                    doty = y-2
                    addToPortals(id, dotx, doty, portals, adjGraph)
                    addSide(inside, outside, dotx, doty, lines)
                }
                
                // >
                if ((x+2<lines[0].length) && (isAlphabet(lines[y][x+1])) && (lines[y][x+2] == ".")){
                    id = lines[y][x] + lines[y][x+1]
                    dotx = x+2
                    addToPortals(id, dotx, doty, portals, adjGraph)
                    addSide(inside, outside, dotx, doty, lines)
                }

                // <
                if ((x-2>=0) && (isAlphabet(lines[y][x-1])) && (lines[y][x-2] == ".")){
                    id = lines[y][x-1] + lines[y][x]
                    dotx = x-2
                    addToPortals(id, dotx, doty, portals, adjGraph)
                    addSide(inside, outside, dotx, doty, lines)
                }
            }
        }
    }
    console.log(portals)
    outside.delete[portals["AA"]]
    outside.delete[portals["ZZ"]]
    let start = portals["AA"]
    let end = portals["ZZ"]
    return {graph:adjGraph, start:start, end:end, inside:inside, outside:outside}
}

findmin = (nodes, dist, inside, outside) => {
    let minimum = Number.MAX_VALUE
    let min_node = 0
    for (const node of nodes){
        if (dist[node] < minimum){
            min_node = node
            minimum = dist[node]
        }
    }
    return min_node
}

donut = mazeMap => {
    let parse = parseMap(mazeMap)
    let source = parse.start
    let target = parse.end
    let source_target_level = 0
    let graph = parse.graph
    let prev = {}
    let dist = {}
    let unvisited = new Set()
    console.log(parse)
    let nodes = Object.keys(graph)
    let alt = Number.MAX_VALUE

    for (const vertex of nodes){
        dist[vertex] = Number.MAX_VALUE-1
        prev[vertex] = []
        unvisited.add(vertex)
    }
    dist[pt2str(source)] = 0

    while (unvisited.size > 0){
        u = findmin(Array.from(unvisited), dist)
        unvisited.delete(u)
        // console.log(u)
        // console.log(dist)
        console.log(u, graph[u])
        // if (u===0){
        //     console.log(dist, unvisited)
        // }
        for (const neighbour of graph[u]){
            alt = dist[u] + 1
            if (alt < dist[neighbour]){
                dist[neighbour] = alt
                prev[neighbour] = u
            }
        }

        if(u === pt2str(target)){
            return dist[u]
        }
        
    }
    return dist[pt2str(target)]

}


module.exports = donut

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('example3.txt')).toString()
    console.log(donut(data.slice()))

  }