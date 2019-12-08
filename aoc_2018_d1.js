const fs = require('fs')

var data = Buffer.from(fs.readFileSync('aoc_2018_d1.txt')).toString()
data = data.split("\n").map(function (item){
    return parseInt(item)
})

function add(a,b){
    return a + b
}

console.log(data.reduce(add))

var values = new Set()
var freq = 0
var index = 0
while (true){
    freq += data[index]
    if (values.has(freq)){
        console.log(freq)
        break;
    } else {
        values.add(freq)
        if (index === data.length - 1){
            index = 0
        } else {
            index += 1
        }
    }

}