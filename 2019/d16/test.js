const assert = require('assert');
const fftlib = require('./fft');
const fft = fftlib.fft
const part2 = fftlib.part2

describe('Day 16', () => {
    it('Run Phases Sample 1', () => {
        input = "12345678"
        base_pattern = [0, 1, 0, -1]
        n = 4
        expected = "01029498"
        assert.strictEqual(fft(input, base_pattern, n), expected)
    });

    it('Run Phases Sample 2', () => {
        input = "80871224585914546619083218645595"
        base_pattern = [0, 1, 0, -1]
        n = 100
        expected = "24176176"
        assert.strictEqual(fft(input, base_pattern, n), expected)
    });

    it('Run Phases Sample 3', () => {
        input = "19617804207202209144916044189917"
        base_pattern = [0, 1, 0, -1]
        n = 100
        expected = "73745418"
        assert.strictEqual(fft(input, base_pattern, n), expected)
    });

    it('Run Phases Sample 4', () => {
        input = "69317163492948606335995924319873"
        base_pattern = [0, 1, 0, -1]
        n = 100
        expected = "52432133"
        assert.strictEqual(fft(input, base_pattern, n), expected)
    });

    it('Run Phases Repeat Sample 1', () => {
        input = "03036732577212944063491565474664"
        base_pattern = [0, 1, 0, -1]
        n = 100
        expected = "84462026"
        assert.strictEqual(part2(input), expected)
    });

    it('Run Phases Repeat Sample 2', () => {
        input = "02935109699940807407585447034323"
        base_pattern = [0, 1, 0, -1]
        n = 100
        expected = "78725270"
        assert.strictEqual(part2(input), expected)
    });

    it('Run Phases Repeat Sample 3', () => {
        input = "03081770884921959731165446850517"
        base_pattern = [0, 1, 0, -1]
        n = 100
        expected = "53553731"
        assert.strictEqual(part2(input), expected)
    });
})