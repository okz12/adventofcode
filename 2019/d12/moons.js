

arrSum = arr => arr.reduce((a,b) => a + b, 0)
energy = (x) => Math.abs(x["x"]) + Math.abs(x["y"]) + Math.abs(x["z"])
read_moons = (positions) => {
    return positions.split('\n').map(line => {
        co = line.slice(1,-1).split(',').map(x => parseInt(x.split("=")[1]))
        return {pos: {x: co[0], y: co[1], z: co[2]}, 
                vel: {x: 0, y: 0, z: 0}}
    })
}
moons_to_string = (moons, dim) => {
    return (moons.map(moon => (`p:${moon["pos"][dim]} v:${moon["vel"][dim]}`))).join(' ')
}

moons_vel_to_string = (moons) => {return moons.map(moon => (`vx:${moon["vel"]["x"]} vy:${moon["vel"]["y"]} vz:${moon["vel"]["z"]}`)).join(' ')}
step_dim = (moons, dim) => {
    //gravity
    for (const moon of moons){
        moon["vel"][dim] = moon["vel"][dim]+ arrSum(moons.map(other_moon => {
            return Math.sign(other_moon["pos"][dim] - moon["pos"][dim])
        }))
    }
    // step
    moons.map(moon => {
        moon["pos"][dim] += moon["vel"][dim]
        return moon
    }) 

    return moons
}
step = (moons) => {
    for (const dim of ["x", "y", "z"]){
        moons = step_dim(moons, dim)
    }
    return moons
}

find_energy = (positions, n) => {
    let moons = read_moons(positions)
    for (let i = 0; i < n; i++){
        moons = step(moons)
    }
    let total_energy = arrSum(moons.map(moon => energy(moon["vel"]) * energy(moon["pos"])))
    return total_energy
}

lcm = (n1, n2) => {
    let large = Math.max(n1, n2)
    let small = Math.min(n1, n2)
    let n = large
    while (n % small !== 0){
        n += large
    }
    return n
}


find_repeat = (positions) => {
    let moons = read_moons(positions)
    let repeat = {}
    let start_string = ""
    let i = 0
    for (const dim of ["x", "y", "z"]){
        start_string = moons_to_string(moons, dim)
        step(moons)
        i = 1
        while ((moons_to_string(moons, dim) != start_string)){
            step_dim(moons, dim)
            i++
        }
        repeat[dim] = i
    }
    return lcm(lcm(repeat["x"], repeat["y"]), repeat["z"])
}

module.exports = {find_energy: find_energy, find_repeat: find_repeat}

if (!module.parent) {
    start = `<x=-9, y=10, z=-1>
    <x=-14, y=-8, z=14>
    <x=1, y=5, z=6>
    <x=-19, y=7, z=8>`
    n = 1000

    // part 1
    console.log(find_energy(start, n))

    // part 2
    console.log(find_repeat(start))
  }