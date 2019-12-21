const fs = require('fs')
data = Buffer.from(fs.readFileSync('d6.txt')).toString()
console.log(data)

graph = {}
nodes = new Set(data.replace(/\)/g, "\n").split("\n"))
connections = data.split("\n").map(val => val.split(")"))
for (const connection of connections){
    if (connection[0] in graph){
        graph[connection[0]].push(connection[1])
    } else {
        graph[connection[0]] = [connection[1]]
    }
}

console.log(graph)