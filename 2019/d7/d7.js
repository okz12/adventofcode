const assert = require('assert')
const fs = require('fs')

// DECRYPT OPCODE

//   ABCDE
//   1002
 
//  DE - two-digit opcode,      02 == opcode 2
//   C - mode of 1st parameter,  0 == position mode
//   B - mode of 2nd parameter,  1 == immediate mode
//   A - mode of 3rd parameter,  0 == position mode,
//                                    omitted due to being a leading zero
pad_opcode = (opcode) => "0".repeat(5 - opcode.length) + opcode
assert.equal(pad_opcode("010"), "00010")
read_opcode = (opcode) => {
    opcode_padded = pad_opcode(opcode.toString())
    return {opcode : opcode,
        operator : parseInt(opcode_padded.slice(3,5)),
        p1 : parseInt(opcode_padded.slice(2,3)),
        p2 : parseInt(opcode_padded.slice(1,2)),
        p3 : parseInt(opcode_padded.slice(0,1))
    }
}

function process_arr (arr, input){
    let i = 0
    let output = Array()
    
    while (i< arr.length){
        
        opcode = read_opcode(arr[i])
        console.log(arr.join("."))
        console.log(opcode)
        console.log(input)
        switch (opcode.operator){
            case 1:
                operator_1 = opcode.p1 === 1 ? arr[i+1] : arr[arr[i+1]]
                operator_2 = opcode.p2 === 1 ? arr[i+2] : arr[arr[i+2]]
                store = opcode.p3 === 1 ? i+3 : arr[i+3]
                arr[store] = operator_1 + operator_2
                i += 4
                break;

            case 2:
                operator_1 = opcode.p1 === 1 ? arr[i+1] : arr[arr[i+1]]
                operator_2 = opcode.p2 === 1 ? arr[i+2] : arr[arr[i+2]]
                store = opcode.p3 === 1 ? i+3 : arr[i+3]
                arr[store] = operator_1 * operator_2
                i += 4
                break;
            
            case 3:
                arr[arr[i+1]] = input[0]
                input = input.slice(1)
                i += 2
                break;

            case 4: 
                output.push(arr[arr[i+1]])
                i += 2
                break;

            case 5:
                operator_1 = opcode.p1 === 1 ? arr[i+1] : arr[arr[i+1]]
                operator_2 = opcode.p2 === 1 ? arr[i+2] : arr[arr[i+2]]
                i = operator_1 > 0 ? operator_2 : i + 3
                break;

            case 6:
                operator_1 = opcode.p1 === 1 ? arr[i+1] : arr[arr[i+1]]
                operator_2 = opcode.p2 === 1 ? arr[i+2] : arr[arr[i+2]]
                i = operator_1 == 0 ? operator_2 : i + 3
                break;

            case 7:
                operator_1 = opcode.p1 === 1 ? arr[i+1] : arr[arr[i+1]]
                operator_2 = opcode.p2 === 1 ? arr[i+2] : arr[arr[i+2]]
                store = opcode.p3 === 1 ? i+3 : arr[i+3]
                arr[store] = operator_1 < operator_2 ? 1 : 0
                i += 4
                break;

            case 8:
                operator_1 = opcode.p1 === 1 ? arr[i+1] : arr[arr[i+1]]
                operator_2 = opcode.p2 === 1 ? arr[i+2] : arr[arr[i+2]]
                store = opcode.p3 === 1 ? i+3 : arr[i+3]
                arr[store] = operator_1 === operator_2 ? 1 : 0
                i += 4
                break;

            case 99:
                return output

            default:
                throw opcode.operator + " not in opcodes"
                // return [-1000]
    }

  }
  console.log("Continue")
  return output
}

// data = Buffer.from(fs.readFileSync('d5.txt')).toString().split(",").map(val => parseInt(val))
// console.log(process_arr(data.slice(0), 1))
// console.log(process_arr(data.slice(0), 5))



run_amplifiers = (data, phases) => {
    let input = 0
    for (const phase of phases) {
        input = process_arr(data.slice(0), [phase, input]).pop()
    }
    return input
}

build_permutation = arr =>{
    // factorial = n => {return n === 0 ? 1 : n * factorial(n - 1)}
    
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
var cont = false
run_amplifiers_feedback = (data, phases) => {
    let input = 0
    let idx = 0
    cont = true
    amplifiers_done = [false, false, false, false, false]
    console.log(data)
    console.log(phases)
    while(amplifiers_done.every(x=>x)){
        if (!amplifiers_done[idx]){
            console.log(phases[idx])
            console.log(input)
            input = process_arr(data.slice(0), [phases[idx], input]).pop()
            console.log(input[0] == null)
        

            if (input[0] == null){
                amplifiers_done[idx] = true
            }
        }
        idx = (idx + 1) % 5
    }
    cont = false
    console.log(input)
    return input
}

// part 1

data = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
phases = [4, 3, 2, 1, 0]
output = 43210
assert.equal(run_amplifiers(data, phases), output)

// data = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]
// phases = [0,1,2,3,4]
// output = 54321
// assert.equal(run_amplifiers(data, phases), output)

// data = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]
// phases= [1,0,4,3,2]
// output = 65210
// assert.equal(run_amplifiers(data, phases), output)



// data = Buffer.from(fs.readFileSync('d7.txt')).toString().split(",").map(val => parseInt(val))
// phases = build_permutation([0, 1, 2, 3, 4])
// outputs = phases.map(val => run_amplifiers(data, val))
// max_idx = outputs.indexOf(Math.max(...outputs))
// console.log(phases[max_idx], outputs[max_idx])

// part 2
// data = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
// phases = [9, 8, 7, 6, 5]
// output = 139629729
// assert.equal(run_amplifiers_feedback(data, phases), output)

// data = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
// phases = [9, 7, 8, 5, 6]
// output = 18216
// assert.equal(run_amplifiers_feedback(data, phases), output)

// data = Buffer.from(fs.readFileSync('d7.txt')).toString().split(",").map(val => parseInt(val))
// phases = build_permutation([5, 6, 7, 8, 9])
//     outputs = phases.map(val => run_amplifiers(data, val))
// max_idx = outputs.indexOf(Math.max(...outputs))
// console.log(phases[max_idx], outputs[max_idx])