const assert = require('assert');
const donut = require('./donut');
const fs = require('fs')


describe('Day 20', () => {
    it('Donut Sample 1', () => {
        input = Buffer.from(fs.readFileSync('example1.txt')).toString()
        expected = 23
        output = donut(input)
        assert.strictEqual(output, expected)
    });

    it('Donut Sample 2', () => {
        input = Buffer.from(fs.readFileSync('example2.txt')).toString()
        expected = 58
        output = donut(input)
        assert.strictEqual(output, expected)
    });

    it('Donut Part 2 Sample 1', () => {
        input = Buffer.from(fs.readFileSync('example3.txt')).toString()
        expected = 58
        output = donut(input)
        assert.strictEqual(output, expected)
    });
})