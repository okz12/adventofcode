const assert = require('assert');

const bugs = require('./bugs');
const findMatch = bugs.findMatch


describe('Day 24', () => {
    it('Evolving Bugs sample 1', () => {
        const input = `....#
        #..#.
        #..##
        ..#..
        #....`

        assert.strictEqual(findMatch(input), 2129920)

    });
})