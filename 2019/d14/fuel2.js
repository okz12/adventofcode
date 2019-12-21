const fuel = require('./fuel')

binary_search = (input) => {
    let L = 0;
    let TRILLION = 1e12
    let R = 4 * Math.ceil(TRILLION / fuel(input, "FUEL", 1));

    while (L <= R){
        m = Math.floor((L + R)/ 2)
        fuel_value_low = fuel(input, "FUEL", m)
        fuel_value_high = fuel(input, "FUEL", m+1)
        if (fuel_value_high < TRILLION){
            L = m + 1
        } else if (fuel_value_low > TRILLION){
            R = m - 1
        } else {
            return m
        }
    }
    return m
}

module.exports = binary_search

if (!module.parent) {
  let fs = require('fs')
  let data = Buffer.from(fs.readFileSync('d14.txt')).toString()
  console.log(binary_search(data))
}