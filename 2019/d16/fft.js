run_phase = (input, base_pattern, offset = 0) => {
    let total = 0
    let total_normed = 0
    let new_number = Array()
    let output = 0
    for (let i = 0; i < input.length; i ++){
        total = 0
        for (let j = input.length-1; j >= offset; j--){
            base_pattern_index = (Math.floor( ((offset+j+1) / (i+1)) )) % base_pattern.length
            // console.log(i, j, base_pattern_index, input[j], base_pattern[base_pattern_index])
            output = Math.abs(input[j] * base_pattern[base_pattern_index]) % 10
            total += input[j] * base_pattern[base_pattern_index]
        }
        total_normed = Math.abs(total) % 10
        new_number.push(total_normed)
    }
    return new_number.join('')
}

run_phases_n = (input, base_pattern, n) => {
    let offset = 0

    for (let i = 0; i<n; i++){
        input = input.padStart(8, '0').split('').map(x => parseInt(x))
        input = run_phase(input, base_pattern, offset)
    }
    return input.slice(0, 8)
}

part2 = input => {
    let offset = parseInt(input.slice(0,7))
    input = input.slice().repeat(10000).split('').map(x => parseInt(x))
    let total = 0
    for (let i =0; i<100; i++){
        total = 0
        for (let idx = input.length-1; idx >= offset; idx--){
            total += parseInt(input[idx])
            input[idx] = Math.abs(total)%10
        }
    }
    return input.slice(offset, offset+8).join('')
}

module.exports = {fft: run_phases_n, part2: part2}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('d16.txt')).toString()
    console.log(run_phases_n(data.slice(), [0, 1, 0, -1], 100))

    console.log(part2(data.slice()))

  }