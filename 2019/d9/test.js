const assert = require('assert');
const sensorboost = require('./sensorboost');


describe('Day 9', () => {
    it('Run Sensor Boost Sample 1', () => {
        instructions = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        inputs = []
        output = instructions.slice()
        assert.deepEqual(sensorboost(instructions, inputs), output)
    });

    it('Run Sensor Boost Sample 2', () => {
        instructions = [1102,34915192,34915192,7,4,7,99,0];
        inputs = []
        assert.strictEqual(sensorboost(instructions, inputs)[0].toString().length, 16)
    });

    it('Run Sensor Boost Sample 3', () => {
        instructions = [104,1125899906842624,99];
        inputs = []
        output = instructions[1]
        assert.strictEqual(sensorboost(instructions, inputs)[0], output)
    });

})