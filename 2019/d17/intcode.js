// ENUM
let OPCODE = {
    ADD : 1,
    MULTIPLY : 2,
    STORE_INPUT : 3,
    SEND_TO_OUTPUT : 4,
    JUMP_IF_TRUE: 5,
    JUMP_IF_FALSE: 6,
    LESS_THAN : 7,
    EQUALS : 8,
    ADJUST_RELATIVE_BASE: 9,
    END_PROGRAM : 99
}

class IntCode {
    constructor(instructions, inputs=[]){
        this.memory = {}
        for (let i =0; i < instructions.length; i++){
            this.memory[i] = instructions[i]
        }

        this.memory = instructions
        this.inputs = inputs
        this.pointer = 0
        this.terminated = false
        this.relative_base = 0
    }

    getParameter (parameterMode, position){
        switch (parameterMode){
            case 0:
                return this.memory[this.memory[position]]
            case 1:
                return this.memory[position]
            case 2:
                return this.memory[this.memory[position] + this.relative_base]
        }
    }

    run (input) {
        let output = null
        if (!(typeof(input) === "undefined")){
            // console.log(typeof(input))
            this.inputs.push(input)
            // console.log(inputs)
        }
        let a = 0;
        while(!this.terminated ){
            a++
            let instruction = this.memory[this.pointer].toString().padStart(5, '0')
            let opcode = Number(instruction.slice(3,5))
            let {parameter1, parameter2, parameter3} = [null, null, null]

            // fetch relevant parameters by opcode
            if ([1, 2, 4, 5, 6, 7, 8, 9].includes(opcode)){
                parameter1 = this.getParameter(Number(instruction[2]), this.pointer+1)
            }
            if (opcode===3){
                parameter1 = Number(instruction[2]) === 2 ? this.memory[this.pointer+1] + this.relative_base : this.memory[this.pointer+1]
            }
            if ([1, 2, 5, 6, 7, 8, 9].includes(opcode)){
                parameter2 = this.getParameter(Number(instruction[1]), this.pointer+2)
            }
            if ([1, 2, 7, 8, 9].includes(opcode)){
                parameter3 = Number(instruction[0]) === 2 ? this.memory[this.pointer+3] + this.relative_base : this.memory[this.pointer+3]
            }

            // console.log(this.pointer, this.inputs, this.relative_base, instruction, opcode, parameter1, parameter2, parameter3)

            switch(opcode){
                case OPCODE.ADD:
                    this.memory[parameter3] = parameter1 + parameter2
                    this.pointer += 4
                    break;
                    
                case OPCODE.MULTIPLY:
                    this.memory[parameter3] = parameter1 * parameter2
                    this.pointer += 4
                    break;

                case OPCODE.STORE_INPUT:
                    this.memory[parameter1] = this.inputs.shift()
                    this.pointer += 2
                    break;
    
                case OPCODE.SEND_TO_OUTPUT: 
                    output = parameter1
                    this.pointer += 2
                    this.inputs = []
                    return output
    
                case OPCODE.JUMP_IF_TRUE:
                    this.pointer = parameter1 != 0 ? parameter2 : this.pointer + 3
                    break;
    
                case OPCODE.JUMP_IF_FALSE:
                    this.pointer = parameter1 == 0 ? parameter2 : this.pointer + 3
                    break;
    
                case OPCODE.LESS_THAN:
                    this.memory[parameter3] = parameter1 < parameter2 ? 1 : 0
                    this.pointer += 4
                    break;
    
                case OPCODE.GREATER_THAN:
                    this.memory[parameter3] = parameter1 > parameter2 ? 1 : 0
                    this.pointer += 4
                    break;

                case OPCODE.EQUALS:
                    this.memory[parameter3] = parameter1 === parameter2 ? 1 : 0
                    this.pointer += 4
                    break;

                case OPCODE.ADJUST_RELATIVE_BASE:
                    this.relative_base += parameter1
                    this.pointer += 2
                    break;
    
                case OPCODE.END_PROGRAM:
                    this.terminated = true
                    break;

                default:
                    throw (`opcode undefined ${opcode}`)
            }
        }
    }
}

module.exports = IntCode;