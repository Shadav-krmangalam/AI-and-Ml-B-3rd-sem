# Private Counter Module

## Difficulty

Easy

## Estimated Time

10–15 Minutes

---

# Problem Statement

In many real-world applications, internal data should not be directly accessible or modifiable from outside a module. This helps maintain data integrity and prevents accidental changes.

Your task is to implement a reusable **Counter Module** in Node.js that manages its own internal counter. The counter should only be updated using the methods exposed by the module.

The module must ensure that the internal counter cannot be modified directly by external code.

---

# Objective

Implement the module inside:

```text
src/index.js
```

---

# How Your Module Will Be Used

**See `src/example.js` to understand how your exported methods will be imported and used.**

You can also run this example to see the expected behavior:

```bash
node src/example.js
```

---

# Module Methods

The module should export an object with the following methods:

- `increment()` – Increases the counter by **1**.
- `decrement()` – Decreases the counter by **1**.
- `getCount()` – Returns the current value of the counter.

---

# Functional Requirements

- The counter should start with an initial value of **0**.
- Calling `increment()` should increase the counter by **1**.
- Calling `decrement()` should decrease the counter by **1**.
- Calling `getCount()` should always return the latest counter value.
- The actual counter value should remain private.
- Directly assigning a value to `counter.count` must **not** affect the internal counter maintained by the module.

---

# Key Behavior

```
0          (initial value)
1          (after increment)
2          (after another increment)
1          (after decrement)
undefined  (counter property is private - cannot be accessed)
1          (internal counter unchanged despite direct assignment attempt)
```

---
# Test Cases

| ID | Description | Expected Result |
|----|-------------|----------------|
| TC-001 | Counter should return `0` initially | Pass |
| TC-002 | Calling `increment()` should increase the counter | Pass |
| TC-003 | Calling `decrement()` should decrease the counter | Pass |
| TC-004 | Internal counter should not be directly accessible | Pass |
| TC-005 | Direct modification using `counter.count` should not affect the actual counter | Pass |

---

# Project Structure

```text
core-nodejs-modules/

├── src/
│   ├── index.js          ← Your implementation here
│   └── example.js        ← See how it's used
│
├── tests/
│   └── test.js
│
├── package.json
└── README.md
```

---

# Running the Project

Install dependencies:

```bash
npm install
```

Run the example to see expected behavior:

```bash
node src/example.js
```

Run the test cases:

```bash
npm test
```

---
