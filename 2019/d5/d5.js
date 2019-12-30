let assert = require('assert')
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
                arr[arr[i+1]] = input
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
    }

  }
}

data = Buffer.from(fs.readFileSync('d5.txt')).toString().split(",").map(val => parseInt(val))
console.log(process_arr(data.slice(0), 1))
console.log(process_arr(data.slice(0), 5))