const http = require("http")

const server =  http.createServer((req,res)=>{

    // res.write("<h1>Hello World</h1>")
    // res.write("<p>Node js class</p>")
    // res.write("<span>3rd sem</span>")
    // res.end()

    // if(req.url === "/"){
    //     res.write("<h1>Home Page</h1>")
    //     res.end();
    // }

    // if(req.url==="/about"){
    //     res.write("<h1>About Page</h1>")
    //     res.end();
    // }
 
    //   console.log(req.method)
    //   res.end()


    // if(req.method==="GET"){
    //     res.write("<h1>GET Method</h1>")
    //     res.end()
    // }

    // if(req.method==="POST"){
    //     res.write("<h1>POST Method</h1>")
    //     res.end()
    // }


    // if(req.url==="/user" && req.method==="GET"){
    //     res.write("<h1>Data Retrieving</h1>")
    //     res.end()
    // }

    // if(req.url==="/user" && req.method==="POST"){
    //     res.write("<h1>Data Created</h1>")
    //     res.end()
    // }
    


    // console.log(req.headers.token)
    // res.end()


    let body = ""

    req.on("data",(chunk)=>{
        body+=chunk
    })

    req.on("end",()=>{
        console.log(body)
        res.end()
    })

})

server.listen(3000,()=>{
    console.log("Server is running on PORT 3000")
})