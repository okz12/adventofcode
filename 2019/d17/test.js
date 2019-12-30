// var mocha = require('mocha')
// var describe = mocha.describe
// var it = mocha.it
const assert = require('assert');

const scaffold = require('./scaffold')
let alignment = scaffold.alignment

describe('Day 17', () => {
    it('Alignment Sample 1', () => {
        const input = 
            `..#..........
            ..#..........
            #######...###
            #.#...#...#.#
            #############
            ..#...#...#..
            ..#####...#..`.split('\n').map(x => x.trim());

        assert.strictEqual(alignment(input), 76)

    });

    // it('Alignment Sample 1', () => {
    //     const input = 
    //         `..#..........
    //         ..#..........
    //         #######...###
    //         #.#...#...#.#
    //         #############
    //         ..#...#...#..
    //         ..#####...#..`.split('\n').map(x => x.trim());

    //     assert.strictEqual(alignment(input), 76)

    // });
})