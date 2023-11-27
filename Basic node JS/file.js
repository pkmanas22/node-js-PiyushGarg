const fs = require("fs")
// sync. funtion return but async function does not return anything
// sync.. --> blocking  -- line- 49
// async.. --> non-blocking  -- line- 57


// Sync... 
// fs.writeFileSync('./text.txt', 'Hey there, created the text file using sync file fs in node js')

// Async... callback function must be need for error handling
// fs.writeFile('./text.txt', 'async file fs in node js',(err) => {})


// reading the file
// sync...
// const contact = fs.readFileSync('./contact.txt','utf-8')
// console.log(contact);


// async...
/*fs.readFile('./contac0t.txt','utf-8',(err,result) => {
    if (err) {
        console.log("Error occured: " + err);
    }else{
        console.log(result);
    }
})*/

// append in a file
// fs.appendFileSync('./contact.txt',`\n${Date.now()} \t ip-address \t user-name`)


// copy a file
// fs.cpSync('./contact.txt', 'copyfile.txt')

// delete a file
// fs.unlinkSync('./copyfile.txt')


// stats of a file
// console.log(fs.statSync('./contact.txt'));


// create folder
// fs.mkdirSync('my-docs')
// fs.mkdirSync('my-doc/a/b',{recursive: true}) // folder inside folder


// Blocking 
/*console.log('1');
console.log('2');
const result = fs.readFileSync('./contact.txt','utf-8')
console.log(result);
console.log('3');
console.log('4');*/

// non-Blocking 
/*
console.log('1');
console.log('2');
fs.readFile('./contact.txt','utf-8',(err,result) => {
    console.log(result);
})
console.log('3');
console.log('4');
// in this first 1234 executed then blocking file starts
*/

// Defalut thread pool size = 4
// maximum size depends on the machine
const os = require('os')
console.log(os.cpus().length);  // for own user