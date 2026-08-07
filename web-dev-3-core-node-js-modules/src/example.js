// EXAMPLE: How to use the Counter Module
// ========================================
// This file demonstrates how the exported methods from index.js are used
// Students can run this to see the expected behavior

const counter = require("./index");


console.log("Initial count:");
console.log(counter.getCount());                     // Output: 0

console.log("\nAfter calling increment():");
counter.increment();
console.log(counter.getCount());                     // Output: 1

console.log("\nAfter another increment():");
counter.increment();
console.log(counter.getCount());                     // Output: 2

console.log("\nAfter calling decrement():");
counter.decrement();
console.log(counter.getCount());                     // Output: 1

console.log("\nTrying to access counter.count directly:");
console.log(counter.count);                          // Output: undefined (private!)

console.log("\nTrying to modify directly with counter.count = 100:");
counter.count = 100;
console.log("Direct assignment: counter.count =", counter.count);
console.log("But actual counter value:", counter.getCount());  // Output: 1 (unchanged!)
