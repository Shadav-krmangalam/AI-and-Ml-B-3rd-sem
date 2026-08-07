// TODO: Implement a Private Counter Module
//
// Requirements:
// 1. Create a counter that starts at 0
// 2. Expose three methods: increment(), decrement(), getCount()
// 3. The counter must be PRIVATE - not directly accessible from outside
// 4. External code should NOT be able to modify the counter directly
// Hints:
// See src/example.js to understand how your exported methods will be used


let count=0;
function increment(){
    return count++;
}

function decrement(){
    return count--;
}

function getCount(){
    return count;
}

module.exports = {increment,decrement,getCount}