

create_matrix = (x, y) => {
    let grid = new Array()
    for (let y_ = 0; y_ < y; y_++){
        grid.push(new Array(x).fill(0))
    }
    return grid
}

adjacency = tiles => {
    let grid = create_matrix(tiles[0].length, tiles.length)

    for (let y = 0; y < tiles.length; y++){
        for (let x = 0; x < tiles.length; x++){
            if (tiles[y][x] === "#"){
                if (x+1 <= tiles[0].length-1){
                    grid[y][x+1]++
                }
                if (x-1 >= 0){
                    grid[y][x-1]++
                }
                if (y+1 <= tiles.length-1){
                    grid[y+1][x]++
                }
                if (y-1 >= 0){
                    grid[y-1][x]++
                }
            }
        }
    }
    return grid
}

evolve = tiles => {
    let adj_matrix = adjacency(tiles)
    let next_tiles = tiles.slice().map(x => x.map(y => y)) // deepcopy

    for (let y = 0; y < tiles.length; y++){
        for (let x = 0; x < tiles.length; x++){
            // A bug dies (becoming an empty space) unless there is exactly one bug adjacent to it.
            if ((tiles[y][x] === "#") && (adj_matrix[y][x] !== 1)){
                next_tiles[y][x] = '.'
            }
            // An empty space becomes infested with a bug if exactly one or two bugs are adjacent to it.
            if ((tiles[y][x] === '.') && ((adj_matrix[y][x] === 1) || (adj_matrix[y][x] === 2))){
                next_tiles[y][x] = "#"
            }
        }
    }
    return next_tiles
}

pprint = tiles => tiles.slice().map(x => x.join('')).join('\n')
reverse_str = str => str.split('').reverse().join('')
to_binary = str => reverse_str(str).replace(/\n/g,"").replace(/#/g,"1").replace(/\./g,"0")

findMatch = tiles => {
    tiles = tiles.split('\n').map(x => x.trim().split(''))
    let history = new Set()
    let tiles_str =''
    let found = false
    while(!found){
        tiles = evolve(tiles)
        tiles_str = pprint(tiles)
        if (history.has(tiles_str)){
            found = true
            // console.log("FOUND")
            // console.log(tiles_str)
            return parseInt(to_binary(tiles_str), 2)
        }
        history.add(tiles_str)
    }
}

module.exports = {findMatch: findMatch}


if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('input.txt')).toString()

    //part 1
    console.log(findMatch(data.slice()))
  }