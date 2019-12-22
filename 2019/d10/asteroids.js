asteroid_locations = asteroid_map => {
    asteroids = []
    lines = asteroid_map.split('\n').map(x => x.trim())
    for (let y = 0; y < lines.length; y++){
        for(let x = 0; x < lines[0].length; x++){
            if (lines[y][x] === "#"){
                asteroids.push({y : y, x: x})
            }
        }
    }
    return asteroids
}

calc_angle = (dy, dx) => {
    let angle = (-Math.atan2(dy, dx)/Math.PI * 180) - 90
    angle = angle < -180 ? angle + 360 : angle 
    return angle
}

visible_count = (asteroids, station) => {
    let visible_asteroids = {};
    for (let asteroid_idx = 0; asteroid_idx < asteroids.length; asteroid_idx++){
        let asteroid = asteroids[asteroid_idx]

        if (!((station.x === asteroid.x) && (station.y === asteroid.y))){ // if not the same point
            dx = asteroid.x - station.x;
            dy = station.y - asteroid.y;
            angle = calc_angle(dy, dx)
            angle = (angle * 1e1).toString().split('.')[0]

            if (!visible_asteroids.hasOwnProperty(angle)){
                visible_asteroids[angle] = []
            }
            visible_asteroids[angle].push(asteroid)
        }
    }
    return visible_asteroids
}

vaporize = (station, asteroid_map, n) => {
    let asteroids = asteroid_locations(asteroid_map)
    let visible_asteroids = visible_count(asteroids, station)
    let angles = Array.from(new Set(Object.keys(visible_asteroids).map(x => parseInt(x))))
    angles = angles.sort((a, b) => a-b)
    let angles_idx = 0
    let closest_asteroid = null
    for (let x = 0; x < n; x++){


        angles_idx = angles_idx === angles.length ? 0 : angles_idx // back to zero
        let angle = angles[angles_idx]

        if (visible_asteroids[angle].length === 1){
            closest_asteroid = visible_asteroids[angle][0]
            delete visible_asteroids[angle]
            angles.splice(angles_idx, 1)
        } else {
            let distances = visible_asteroids[angle].map(ast => (station.x-ast.x)**2 + (station.y-ast.y)**2)
            let closest_asteroid_idx = distances.indexOf(Math.min(...distances))
            closest_asteroid = visible_asteroids[angle][closest_asteroid_idx]
            visible_asteroids[angle].splice(closest_asteroid_idx, 1)
            angles_idx++
        }
    }
    return closest_asteroid
}

find_station = (asteroid_map) => {
    asteroids = asteroid_locations(asteroid_map)
    visible_asteroids = asteroids.map(x => Object.keys(visible_count(asteroids, x)).length)
    max_asteroids = Math.max(...visible_asteroids)
    station = asteroids[visible_asteroids.indexOf(max_asteroids)]
    return {station: station, max_asteroids: max_asteroids}
}

module.exports = {find_station: find_station, vaporize: vaporize}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('d10.txt')).toString()

    // part 1
    station = find_station(data)
    console.log(station)

    // part 2
    vaporize_200 = vaporize(station.station, data, 200)
    console.log(vaporize_200)
  }