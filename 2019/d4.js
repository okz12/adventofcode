// It is a six-digit number.
function isSixDigit(num){
    return num.length === 6
}
console.log(isSixDigit("123456")) // true
console.log(isSixDigit("1234")) // false

// // The value is within the range given in your puzzle input.
// function withinRange(num, min, max){
//     return num > min && num < max
// }
// console.log(withinRange(10, 0, 20)) // true
// console.log(withinRange(10, 11, 20)) // false
// console.log(withinRange(10, 0, 9)) // false

// Two adjacent digits are the same (like 22 in 122345).
function adjacentNumber(num){
    num_list = num.split('')
    n_prev = num_list[0]
    for (const n of num_list.slice(1)){
        if (n === n_prev){
            return true
        } else {
            n_prev = n
        }
    }
    return false
}
console.log(adjacentNumber("112345")) // true
console.log(adjacentNumber("123455")) // true
console.log(adjacentNumber("123456")) // false

// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
function increasingNumber(num){
    num_list = num.split('')
    n_prev = num_list[0]
    for (const n of num_list.slice(1)){
        if (parseInt(n) >= parseInt(n_prev)){
            n_prev = n
        } else {
            return false
        }
    }
    return true
}
console.log(increasingNumber("1234445")) // true
console.log(increasingNumber("123456")) // true
console.log(increasingNumber("123245")) // false

function adjacentNumber2(num){
    num_list = num.split('')
    let curr = num_list[0]
    let curr_counter = 1

    for (const n of num_list.slice(1)){
        if (n === curr){
            curr_counter += 1
        } else if (curr_counter === 2){
            return true
        } else {
            curr_counter = 1
            curr = n
        }
    }
    return (curr_counter === 2)
}

function crackPassword(min, max){
    let total = 0
    for (let i = min; i < max; i++){
        num = i.toString()
        if (isSixDigit(num) && 
            // adjacentNumber(num) && // part 1
            adjacentNumber2(num) && //part 2
            increasingNumber(num)){
                total += 1
            }
    }
    console.log(total)
}

crackPassword(256310, 732736)