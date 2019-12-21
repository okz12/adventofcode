fuel = (input, ch, qu) => {

  parse_element = (chem) => {
    element = {}
    element.quantity = parseInt(chem.trim().split(" ")[0])
    element.id = chem.trim().split(" ")[1]
    return element
  }

  parse_reaction = (line) => {
    output = parse_element(line.split("=>")[1])
    input = line.split("=>")[0].split(",").map(parse_element)
    return {input: input, output: output}
  }
  
  let reactions_list = input.split("\n").map(parse_reaction)
  var reactions_graph = {}
  for (reaction of reactions_list){
    reactions_graph[reaction.output.id] = reaction
  }

  var chemical_store = {}
  var totalOre = 0


  search = (output, output_quantity) => {
    let reaction = reactions_graph[output]

    if (output in chemical_store){
      if (output_quantity > chemical_store[output]){
        // store contains some but insufficient chemicals
        output_quantity -= chemical_store[output]
        chemical_store[output] = 0
      } else {
        // store contains enough chemicals
        chemical_store[output] -= output_quantity
        return 0
      }
    }

    let reaction_multiplier = Math.ceil(output_quantity/reaction.output.quantity)
    
    if (!(output in chemical_store)){
      chemical_store[output] = 0
    }
    add_to_store = (reaction_multiplier * reaction.output.quantity) - output_quantity
    chemical_store[output] += add_to_store

    if (reaction.input.length === 1 && reaction.input[0].id === "ORE"){
      totalOre += reaction_multiplier * reaction.input[0].quantity;
    } else {
      reaction.input.forEach((ingredient) => {search(ingredient.id, ingredient.quantity * reaction_multiplier)})
    }
  }
  search(ch, qu)
  return totalOre  
};

module.exports = fuel

if (!module.parent) {
  let fs = require('fs')
  let data = Buffer.from(fs.readFileSync('d14.txt')).toString()
  console.log(fuel(data, "FUEL", 1))
}