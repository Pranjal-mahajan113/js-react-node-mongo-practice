const fs = require("fs");
const stream = fs.createReadStream("large.txt");
 stream.on("data",(chunk) =>{
    console.log(chunk.toString())
 })

 
 stream.on("end",() =>{
    console.log("file end")
 })
 