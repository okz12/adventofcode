const assert = require('assert');
const amplifiers = require('./amplifiers');
let run_amplifiers = amplifiers.run_amplifiers
let run_amplifiers_feedback = amplifiers.run_amplifiers_feedback


describe('Day 7', () => {
    it('Run Amplifiers Sample 1', () => {
        data = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
        phase = [4, 3, 2, 1, 0]
        output = 43210

        assert.strictEqual(run_amplifiers(data, phase), output)
    });

    it('Run Amplifiers Sample 2', () => {
        data = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]
        phase = [0,1,2,3,4]
        output = 54321

        assert.strictEqual(run_amplifiers(data, phase), output)
    });

    it('Run Amplifiers Sample 3', () => {
        data = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]
        phase= [1,0,4,3,2]
        output = 65210

        assert.strictEqual(run_amplifiers(data, phase), output)
    });

    it('Run Amplifiers Feedback Sample 1', () => {
        data = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
        phases = [9, 8, 7, 6, 5]
        output = 139629729
        assert.equal(run_amplifiers_feedback(data, phases), output)
    });

    it('Run Amplifiers Feedback Sample 2', () => {
        data = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
        phases = [9, 7, 8, 5, 6]
        output = 18216
        assert.equal(run_amplifiers_feedback(data, phases), output)
    });
})