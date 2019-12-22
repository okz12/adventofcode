const assert = require('assert');
const asteroids = require('./asteroids');
const find_station = asteroids.find_station
const vaporize = asteroids.vaporize


describe('Day 10', () => {
    it('Station Exploration Sample 1', () => {
        asteroid_map = `.#..#
                        .....
                        #####
                        ....#
                        ...##`
        expected = {
            max_asteroids : 8,
            station : {
                y : 4,
                x : 3
            }
        }
        actual = find_station(asteroid_map)
        assert.deepEqual(actual, expected)
    });

    it('Station Exploration Sample 2', () => {
        asteroid_map = `......#.#.
                        #..#.#....
                        ..#######.
                        .#.#.###..
                        .#..#.....
                        ..#....#.#
                        #..#....#.
                        .##.#..###
                        ##...#..#.
                        .#....####`
        expected = {
            max_asteroids : 33,
            station : {
                y : 8,
                x : 5
            }
        }
        actual = find_station(asteroid_map)
        assert.deepEqual(actual, expected)
    });

    it('Station Exploration Sample 3', () => {
        asteroid_map = `#.#...#.#.
                        .###....#.
                        .#....#...
                        ##.#.#.#.#
                        ....#.#.#.
                        .##..###.#
                        ..#...##..
                        ..##....##
                        ......#...
                        .####.###.`
        expected = {
            max_asteroids : 35,
            station : {
                y : 2,
                x : 1,
            }
        }
        actual = find_station(asteroid_map)
        assert.deepEqual(actual, expected)
    });

    it('Station Exploration Sample 4', () => {
        asteroid_map = `.#..#..###
                        ####.###.#
                        ....###.#.
                        ..###.##.#
                        ##.##.#.#.
                        ....###..#
                        ..#.#..#.#
                        #..#.#.###
                        .##...##.#
                        .....#.#..`
        expected = {
            max_asteroids : 41,
            station : {
                y : 3,
                x : 6
            }
        }
        actual = find_station(asteroid_map)
        assert.deepEqual(actual, expected)
    });

    it('Station Exploration Sample 5', () => {
        asteroid_map = `.#..##.###...#######
                        ##.############..##.
                        .#.######.########.#
                        .###.#######.####.#.
                        #####.##.#.##.###.##
                        ..#####..#.#########
                        ####################
                        #.####....###.#.#.##
                        ##.#################
                        #####.##.###..####..
                        ..######..##.#######
                        ####.##.####...##..#
                        .#####..#.######.###
                        ##...#.##########...
                        #.##########.#######
                        .####.#.###.###.#.##
                        ....##.##.###..#####
                        .#.#.###########.###
                        #.#.#.#####.####.###
                        ###.##.####.##.#..##`
        expected = {
            max_asteroids : 210,
            station : {
                y : 13,
                x : 11
            }
        }
        actual = find_station(asteroid_map)
        assert.deepEqual(actual, expected)
    });

    it('Vaporization Sample 1', () => {
        asteroid_map = `.#..##.###...#######
                        ##.############..##.
                        .#.######.########.#
                        .###.#######.####.#.
                        #####.##.#.##.###.##
                        ..#####..#.#########
                        ####################
                        #.####....###.#.#.##
                        ##.#################
                        #####.##.###..####..
                        ..######..##.#######
                        ####.##.####...##..#
                        .#####..#.######.###
                        ##...#.##########...
                        #.##########.#######
                        .####.#.###.###.#.##
                        ....##.##.###..#####
                        .#.#.###########.###
                        #.#.#.#####.####.###
                        ###.##.####.##.#..##`
        expected = {
                y : 2,
                x : 8
            }
        max = find_station(asteroid_map)
        actual = vaporize(max.station, asteroid_map, 200)
        assert.deepEqual(actual, expected)
    });

})