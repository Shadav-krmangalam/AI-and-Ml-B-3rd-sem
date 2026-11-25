const EventEmitter = require("events");
const event = new EventEmitter();

let count=0;
event.on("apicount",()=>{
    count++;
    console.log("Api Count :",count)
})

// event.off("apicount",()=>{
//     console.log("event removed")
// })
module.exports = event