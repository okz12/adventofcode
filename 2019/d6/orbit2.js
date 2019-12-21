orbit = (input, id1, id2) => {
    graph = {}
    distgraph = {}
    connections = input.split('\n')
    for (connection of connections){
        left = connection.split(')')[0].trim()
        right = connection.split(')')[1].trim()
        if (!(left in graph)){
            graph[left] = [right]
        } else {
            graph[left].push(right)
        }
        let r = {[id1]: Number.MAX_VALUE, [id2]:Number.MAX_VALUE}
        distgraph[left] = r
    }

    search = (node, id) => {
        if (!(node in graph)){
            // do nothing
            return Number.MAX_VALUE
        } else if(graph[node].includes(id)){
            
            distgraph[node][id] = 0
            return 0
        } else {
            let min_distance = Number.MAX_VALUE
            let connections = graph[node]
            for (connection of connections){
                min_distance = Math.min(min_distance, search(connection, id))
            }
            distgraph[node][id] = min_distance + 1
            return min_distance + 1
        }
    }
    search("COM", id1)
    search("COM", id2)
    var min_val = Number.MAX_VALUE
    Object.keys(distgraph).forEach((key, index) => {
        min_val = Math.min(distgraph[key][id1] + distgraph[key][id2], min_val)
    })
    return min_val
}

module.exports = orbit

if (!module.parent) {
    let fs = require('fs')
    let data = Buffer.from(fs.readFileSync('d6.txt')).toString()
    console.log(orbit(data, "SAN", "YOU"))
  }