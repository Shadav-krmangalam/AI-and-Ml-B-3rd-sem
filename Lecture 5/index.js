// const os = require("os")

// console.log(os.platform())

// console.log(os.arch())


// console.log(os.hostname())


// console.log(os.version())

// console.log(os.uptime())


// console.log(os.totalmem()/1024/1024/1024)

// console.log(os.freemem()/1024/1024/1024)


// console.log(os.cpus())


// console.log(os.cpus().length)


const fs = require("fs")


// fs.writeFile("data.txt","Hello",(err)=>{
//     if(err) console.log(err)
//         else console.log("File Written")
// })

// fs.readFile("data.txt","utf8",(err,res)=>{
//     if(err) console.log(err)
//         else console.log(res)
// })

// fs.appendFile("data.txt","\n3rd Sem",(err)=>{
//     if(err) console.log(err)
//         else console.log("File updated")

// })

// fs.unlink("data.txt",(err)=>{
//     if(err) console.log(err)
//         else console.log("File Deleted Successfully")
// })


// const data = {name:"John",Age:20,city:"Delhi"}

// fs.writeFile("db.json",JSON.stringify([data],null,2),(err)=>{
//     if(err) console.log(err)
//         else console.log("File written")
// })


// let newData = {name:"John",Age:25,city:"Mumbai"}

// fs.readFile("db.json","utf8",(err,res)=>{
//     if(err) console.log(err)
//         else{
//     let temp = JSON.parse(res)

//     temp.push(newData)

//     fs.writeFile("db.json",JSON.stringify(temp,null,2),(err)=>{
//         if(err) console.log(err)
//             else console.log("File updated")
//     })
// }
// })




// fs.writeFile("db.json",JSON.stringify([data],["name","city"],4),(err)=>{
//     if(err) console.log(err)
//         else console.log("File Written")
// })







// fs.readFile("db.json","utf8",(err,res)=>{


//     let newData = JSON.parse(res)
//     newData.push(data)

//     fs.writeFile("db.json",JSON.stringify(newData,null,2),(err)=>{
//         if(err) console.log(err)
//            else console.log("File written")
//     })
// })




const path = require("path")


// const file = path.join("home","data","user.json")

// console.log(file)

// console.log(path.dirname("home/user/data/file.txt"))

// console.log(path.basename("home/user/data/file.txt"))

// console.log(path.extname("home/user/data/file.txt"))


// const filePath = path.join("home","data","user","file.txt")

// // console.log(filePath)

// fs.mkdir(path.dirname(filePath),{recursive:true},(err)=>{
//     if(err) console.log(err)
//         else{
//             fs.writeFile(filePath,"",(err)=>{
//                 if(err) console.log(err)
//         })
//     }
// })


// const crypto = require("crypto")

// let password1 = "Shadav@1234"

// let password2 = "Shadav@1235"

// let encrypt =crypto.createHash("sha256").update(password1).digest("hex")

// let encrypt2 =crypto.createHash("sha256").update(password2).digest("hex")

// console.log(encrypt,"\n",encrypt2)

const dns = require("dns")


dns.lookup("google.com",(err,address,family)=>{
    console.log(address)
    console.log(family)
})