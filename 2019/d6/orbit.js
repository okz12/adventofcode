orbit = (input) => {
    graph = {}
    connections = input.split('\n')
    for (connection of connections){
        left = connection.split(')')[0].trim()
        right = connection.split(')')[1].trim()
        if (!(left in graph)){
            graph[left] = [right]
        } else {
            graph[left].push(right)
        }
    }

    search = (node) => {
        if (!(node in graph)){
            return [0]
        } else {
            let connections = graph[node]
            let all_counts = Array()
            for (connection of connections){
                all_counts = all_counts.concat(search(connection).map(x => x+1))
            }
            all_counts.push(0)
            return all_counts
        }
    }
    let arrSum = arr => arr.reduce((a,b) => a + b, 0)
    return arrSum(search("COM"))
}

module.exports = orbit

if (!module.parent) {
    let fs = require('fs')
    let data = Buffer.from(fs.readFileSync('d6.txt')).toString()
    console.log(orbit(data))
}