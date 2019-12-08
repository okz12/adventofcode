function process_arr (arr){
    for (let i = 0; i < arr.length; i += 4){
    switch (arr[i]){
      case 1: 
        operand1 = arr[arr[i+1]]
        operand2 = arr[arr[i+2]]
        store = arr[i+3]
        arr[store] = operand1 + operand2
        break;
      case 2: 
        operand1 = arr[arr[i+1]]
        operand2 = arr[arr[i+2]]
        store = arr[i+3]
        arr[store] = operand1 * operand2
        break;
      case 99: 
        return arr
      default:
        throw arr[i] + " not in opcodes"
    }
    }
    return arr
  }
  
  // 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
  // 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
  // 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
  // 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99
  // 1,9,10,3,2,3,11,0,99,30,40,50 becomes 3500,9,10,70, 2,3,11,0, 99, 30,40,50
  // console.log(process_arr([1,0,0,0,99]))
  // console.log(process_arr([2,3,0,3,99]))
  // console.log(process_arr([2,4,4,5,99,0]))
  // console.log(process_arr([1,1,1,4,99,5,6,0,99]))
  // console.log(process_arr([1,9,10,3,2,3,11,0,99,30,40,50]))
  
  var data = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,6,19,23,2,23,6,27,1,5,27,31,1,31,9,35,2,10,35,39,1,5,39,43,2,43,10,47,1,47,6,51,2,51,6,55,2,55,13,59,2,6,59,63,1,63,5,67,1,6,67,71,2,71,9,75,1,6,75,79,2,13,79,83,1,9,83,87,1,87,13,91,2,91,10,95,1,6,95,99,1,99,13,103,1,13,103,107,2,107,10,111,1,9,111,115,1,115,10,119,1,5,119,123,1,6,123,127,1,10,127,131,1,2,131,135,1,135,10,0,99,2,14,0,0]
  
  function finder(arr, n, v){
    let arr_cp = arr.slice(0)
    arr_cp[1] = n
    arr_cp[2] = v
    return process_arr(arr_cp)[0]
  }
  // console.log(finder(data, 2, 0) - finder(data, 1, 0))
  // console.log(finder(data, 3, 0) - finder(data, 2, 0))
  // console.log(finder(data, 0, 1) - finder(data, 0, 0))
  // console.log(finder(data, 0, 2) - finder(data, 0, 0))
  // console.log(finder(data, 0, 0))
  
  y = 19690720
  x1 = finder(data, 1, 0) - finder(data, 0, 0)
  x2 = finder(data, 0, 1) - finder(data, 0, 0)
  c = finder(data, 0, 0)
  
  m1 = Math.floor((y-c)/x1)
  m2 = y-c - (m1 * x1)
  
  console.log(m1*100 + m2)
  
  console.log(finder(data, 31, 46))