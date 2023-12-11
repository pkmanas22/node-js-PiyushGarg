function add(a,b) {
    return a + b
}


function sub(a,b) {
    return a - b
}

// module.exports = {add,sub}      //multi module

// anonymous function --> direct method
exports.add1 = (a,b,c) => a+b+c
exports.sub2 = (a,b,c) => a-b-c
