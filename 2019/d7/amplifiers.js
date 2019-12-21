let IntCode = require('./intcode')

run_amplifiers = (instructions, phases) => {
    let input = 0
    const amplifiers = phases.map((phase) => new IntCode(instructions.slice(), [phase]))
    for (amp of amplifiers){
        input = amp.run(input)
    }
    return input
  };

run_amplifiers_feedback = (instructions, phases) => {
    const amplifiers = phases.map((phase) => new IntCode(instructions.slice(), [phase]))
    let input = 0
    // input = amplifiers[0].run(input)
    while(!amplifiers[4].terminated){
        for (amp of amplifiers){
            input = amp.run(input)
            if (amp.terminated){
                return input
            }
        }
    }
    
    return input
};

build_permutation = arr =>{
    perm = (head, tail) => {
        if (head.length === 0){
            results.push(tail)
        } else {
            for (let i =0; i < head.length; i++){
                h = head.slice(0)
                t = tail.slice(0)
                elem = h.splice(i, 1)[0]
                t.push(elem)
                perm(h, t)
            }
        }
    }

    var results = []
    perm(arr, [])
    return results
}


module.exports = {
    run_amplifiers: run_amplifiers,
    run_amplifiers_feedback: run_amplifiers_feedback
}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('d7.txt')).toString().split(",").map(val => parseInt(val))

    // part 1
    phases = build_permutation([0, 1, 2, 3, 4])
    outputs = phases.map(val => run_amplifiers(data, val))
    max_idx = outputs.indexOf(Math.max(...outputs))
    console.log(phases[max_idx], outputs[max_idx])


    // part 2
    phases = build_permutation([5, 6, 7, 8, 9])
    outputs = phases.map(val => run_amplifiers_feedback(data, val))
    max_idx = outputs.indexOf(Math.max(...outputs))
    console.log(phases[max_idx], outputs[max_idx])
  }