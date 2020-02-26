// creates a logical tree from text

// import itertools
const TYPE_INPUT = "INP"
const TYPE_AND = "AND"
const TYPE_OR = "OR"
const TYPE_NOT = "NOT"
const TYPE_XOR = "XOR"

//used for drawing

class Node {
  constructor(type, label = null, value = null) {
    this.value = value
    this.type = type

    if (type !== TYPE_INPUT) {
      this.children = []
      this.label = type
    } else {
      this.children = null
      this.label = label
    }
    return this
  }
  // visit(func) {
  //   // this is a preorder traversal
  //   func(this)
  //   for (let i = 0; i < this.children.length; i++) {
  //     this.children[i].visit(func)
  //   }
  // }
  addchild(node) {
    if (this.children != null) {
      this.children.push(node)
    }
    return this
  }
}
function build_tree(text) {
  text = preprocess(text) // builds a tree from a string of text
  // Arguments:
  //     txt {str} -- the text to be processed
  // Returns:
  //     new Node -- the tree that has een created
  let variables = [] // a list of the identifiers that can vary
  let not_flag = false
  let cursor = 0
  let current = null
  console.assert(text.length > 0)
  while (cursor < text.length) {
    // let notted = not_flag ? new Node(TYPE_NOT) : null

    switch (text[cursor]) {
      case "+":
      case "|":
      case "∨":
        if (not_flag) {
          current = new Node(TYPE_NOT).addchild(
            new Node(TYPE_OR).addchild(current)
          )
        } else {
          current = new Node(TYPE_OR).addchild(current)
        }
        not_flag = false
        break
      case ".":
      case "&":
      case "∧":
        if (not_flag) {
          current = new Node(TYPE_NOT).addchild(
            new Node(TYPE_AND).addchild(current)
          )
        } else {
          current = new Node(TYPE_AND).addchild(current)
        }
        not_flag = false
        break
      case "*":
      case "^":
      case "⊕":
        if (not_flag) {
          current = new Node(TYPE_NOT).addchild(
            new Node(TYPE_XOR).addchild(current)
          )

          //   current.addchild(new Node(TYPE_NOT).addchild(new Node(TYPE_XOR)))
        } else {
          current = new Node(TYPE_XOR).addchild(current)
        }
        not_flag = false
        break
      case "(": {
        let start = cursor + 1
        let [end, segment] = getsubexp(start, text)
        // let end = text.lastIndexOf(")")
        var [newtree, newvars] = build_tree(segment)
        variables = variables.concat(newvars)
        let toadd = not_flag ? new Node(TYPE_NOT).addchild(newtree) : newtree
        not_flag = false
        current = current == null ? toadd : current.addchild(toadd)
        cursor = end
        break
      }
      case "¬":
      case "!":
      case "~":
        not_flag = true
        break
      //   case ")":
      //     break
      default: {
        variables.push(text[cursor])
        let toadd = not_flag
          ? new Node(TYPE_NOT).addchild(new Node(TYPE_INPUT, text[cursor]))
          : new Node(TYPE_INPUT, text[cursor])

        current = current == null ? toadd : current.addchild(toadd)
        not_flag = false
      }
    }
    cursor += 1
  }
  return [current, variables]
}
function calc_result(tree, values) {
  const child_values = tree.children
    ? tree.children.map(x => calc_result(x, values))
    : null
  switch (tree.type) {
    case TYPE_INPUT:
      if (tree.value == null) {
        return values[tree.label]
      } else {
        return tree.value
      }
    case TYPE_AND:
      return child_values.every(x => x === true)
    case TYPE_OR:
      return child_values.includes(true)
    case TYPE_NOT:
      return !child_values[0]
    case TYPE_XOR:
      // return child_values[0] ^ child_values[1]
      return (
        (child_values[0] && !child_values[1]) ||
        (child_values[1] && !child_values[0])
      )
    default:
      return console.log("An error occured")
  }
}
// Adding paddng to the number in js
function pad(size, n) {
  var s = String(n)
  while (s.length < (size || 2)) {
    s = "0" + s
  }
  return s
}

// Function to convert decimal to binnary in js
function dec2bin(dec) {
  return (dec >>> 0).toString(2)
}

// Function to generate gray code in js
function generateGrayarr(n) {
  var N = 1 << n
  var result = []

  for (var i = 0; i < N; i++) {
    // generate gray code of corresponding
    // binary number of integer i.
    var x = i ^ (i >> 1)

    // printing gray code
    var r = dec2bin(x)

    result.push(pad(n, r))
  }

  return result.map(x => x.split("").map(x => x === "1"))
}

// generateGrayarr(2)
function generate_permutations(variables) {
  let unique_items = [...new Set(variables)]
  let perms = generateGrayarr(unique_items.length)
  let result = []
  for (let j = 0; j < perms.length; j++) {
    var tmpresult = {}
    let permutation = perms[j]
    unique_items.forEach((key, i) => (tmpresult[key] = permutation[i]))
    // console.log(tmpresult)
    result.push(tmpresult)
  }
  return result
}

function getparenloc(str, start = 0) {
  let toignore = 0
  for (let index = start; index < str.length; index++) {
    const element = str[index]
    if (element === "(") {
      toignore++
    } else if (element === ")") {
      if (toignore <= 0) {
        return index
      }
      toignore--
    }
  }
}

function getsubexp(start, str) {
  console.assert(str.length > start)
  //   str = str.substring(start)
  let loc = getparenloc(str, start)
  //   end = start + loc
  str = str.substring(start, loc)
  return [loc, str]
}

function getresult(input) {
  let output = []
  input = preprocess(input)
  var [test, vars] = build_tree(input)
  let p = generate_permutations(vars)
  for (let index = 0; index < p.length; index++) {
    let element = p[index]
    // let current = element
    element["output"] = calc_result(test, element)
    output.push(element)
    // console.log(element)
    // console.log(calc_result(test, element));
  }
  return output
}
function preprocess(str) {
  // var str = "Mr Blue has a blue house and a blue car"
  //¬!~
  const pre = str.replace(/[¬!~][¬!~]/gi, "")
  const tmp = pre.replace(/[a-zA-Z0-9)][a-zA-Z0-9(]/gi, function(x) {
    return x[0] + "." + x[1]
  })
  // console.log(tmp)
  return tmp.replace(/[a-zA-Z0-9)][a-zA-Z0-9(]/gi, function(x) {
    return x[0] + "." + x[1]
  })
  //find
}
export {getresult, build_tree}
