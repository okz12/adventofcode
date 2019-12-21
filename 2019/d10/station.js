convert_to_int = (maze) => maze.split('\n').map(x => x.split('').map(y => (y===".")?0:-1))
seek_x = (input_maze) => {
    let maze = input_maze.slice()
    let x = 0
    let y = 0
    let x_max = maze[0].length
    let y_max = maze.length
    for (y=0; y<y_max; y++){
        let count = 0
        for(x=0; x<x_max; x++){
            // normal continue
            if(input_maze[y][x] === 0){
                if (x === x_max -1){
                    for(let x_back=x-count; x_back<x_max; x_back++){
                        maze[y][x_back]=count + 1
                    }
                    count = 0
                } else {
                    count += 1
                }
                // end of the row
            }
            
            // hit a block
            if(input_maze[y][x] === -1){
                console.log("HIT A BLOCK")
                for(let x_back=x-count; x_back<x; x_back++){
                    maze[y][x_back]=count
                }
                count = 0
            }

            console.log(x, y, maze[y][x])
            console.log(maze)
        }
    }
    return maze
}

seek_y = (input_maze) => {
    let maze = input_maze.slice()
    let x = 0
    let y = 0
    let x_max = maze[0].length
    let y_max = maze.length
    for (x=0; x<x_max; x++){
        let count = 0
        for(y=0; y<y_max; y++){
            // normal continue
            if(input_maze[y][x] === 0){
                if (y === y_max -1){
                    for(let y_back=y-count; y_back<y_max; y_back++){
                        maze[y_back][x]=count + 1
                    }
                    count = 0
                } else {
                    count += 1
                }
                // end of the row
            }
            
            // hit a block
            if(input_maze[y][x] === -1){
                console.log("HIT A BLOCK")
                for(let y_back=y-count; y_back<y; y_back++){
                    maze[y_back][x]=count
                }
                count = 0
            }
        }
    }
    return maze
}

ex1 = ``
console.log(seek_x(convert_to_int(ex1)))
console.log(seek_y(convert_to_int(ex1)))