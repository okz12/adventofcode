const fs = require('fs')
data = Buffer.from(fs.readFileSync('d8.txt')).toString().split('').map(val => parseInt(val))
// console.log(data)

res = Array()
height = 6
width = 25
loops = data.length / (width * height)
for (let j = 0; j < loops; j++){
    res2 = Array()
    for (let i = 0; i < height; i++){
        res2.push(data.splice(0, width))
    }
    res.push(res2)
}

// part 1
serialize = arr => {return arr.reduce(f = (a, b) => {return a.concat(b)})}
count_x = (layer, x) => {return serialize(layer).filter(val => val === x).length}
mult_one_two = layer => {return count_x(layer, 1) * count_x(layer, 2)}
find_min = arr => {return arr.indexOf(Math.min(...arr))}
zero_counts = res.map(val => count_x(val, 0))
console.log(mult_one_two(res[find_min(zero_counts)]))

// part 2
pixel_update = (xp, xn) => {return xp === 2 ? xn : xp}
iterate = (image, step) => {
    for (let i = 0; i < image.length; i ++){
        for (let j = 0; j < image[0].length; j++){
            image[i][j] = pixel_update(image[i][j], step[i][j])
        }
    }
    return image
}

console.log(res.reduce(iterate).map(val => val.join("").replace(/0/g, ' ')))