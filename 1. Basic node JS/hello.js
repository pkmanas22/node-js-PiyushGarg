// console.log("Welcome to Node JS");

// const math = require("fs")  // file system
// console.log(math);


const math = require("./math.js")  // own directory
// console.log(math.sub(5,8));


// const {add,sub} = require("./math.js")
// console.log(sub(15,8));


console.log(math.sub2(6,7,8))