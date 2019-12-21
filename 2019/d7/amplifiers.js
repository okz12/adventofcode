
run_amplifiers = (data, phases) => {
    let input = 0
    for (const phase of phases) {
        input = intcode(data.slice(0), [phase, input]).pop()
    }
    return input
}

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
run_amplifiers_feedback = (data, phases) => {
    let input = 0
    let idx = 0
    amplifiers_done = [false, false, false, false, false]
    while(!amplifiers_done.every(x=>x)){
        if (!amplifiers_done[idx]){
            input = intcode(data.slice(0), [phases[idx], input]).pop()
            if (input[0] == null){
                amplifiers_done[idx] = true
            }
        }
        idx = (idx + 1) % 5
    }
    return input
}

// const amplifiers = phases[i]
//       .map((phase) => new AmplifierController(input, phase));

//     let index = 0;
//     let lastOutput = 0;

//     while (!amplifiers[4].terminated) {
//       const output = amplifiers[index].run(lastOutput);

//       if (output !== null) {
//         lastOutput = output;
//       }

//       index = index + 1 === amplifiers.length ? 0 : index + 1;



module.exports = {
    intcode: intcode,
    run_amplifiers: run_amplifiers,
    run_amplifiers_feedback: run_amplifiers_feedback
}

if (!module.parent) {
    let fs = require('fs')
    data = Buffer.from(fs.readFileSync('d7.txt')).toString().split(",").map(val => parseInt(val))
    phases = build_permutation([0, 1, 2, 3, 4])
    outputs = phases.map(val => run_amplifiers(data, val))
    max_idx = outputs.indexOf(Math.max(...outputs))
    console.log(phases[max_idx], outputs[max_idx])



  }

data = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
phases = [9, 8, 7, 6, 5]
output = 139629729
console.log(run_amplifiers_feedback(data, phases))
// data = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
// phases = [9, 7, 8, 5, 6]
// output = 1821