const assert = require('assert');
const moons = require('./moons');
const find_energy = moons.find_energy
const find_repeat = moons.find_repeat


describe('Day 12', () => {
    it('Simulate N-body Energy Sample 1', () => {
        start = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`
        n = 10
        output = 179
        assert.strictEqual(find_energy(start, n), output)
    });

    it('Simulate N-body Energy Sample 2', () => {
        start = `<x=-8, y=-10, z=0>
        <x=5, y=5, z=10>
        <x=2, y=-7, z=3>
        <x=9, y=-8, z=-3>`
        n = 100
        output = 1940
        assert.strictEqual(find_energy(start, n), output)
    });

    it('Simulate N-body Repeat Sample 1', () => {
        start = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`
        n = 10
        output = 2772
        assert.strictEqual(find_repeat(start, n), output)
    });

    it('Simulate N-body Repeat Sample 2', () => {
        start = `<x=-8, y=-10, z=0>
        <x=5, y=5, z=10>
        <x=2, y=-7, z=3>
        <x=9, y=-8, z=-3>`
        n = 100
        output = 4686774924
        assert.strictEqual(find_repeat(start, n), output)
    });

})