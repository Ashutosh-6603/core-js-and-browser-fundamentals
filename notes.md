# Explain event loop and call stack in JavaScript.

1️⃣ Call Stack — The Execution Tracker

Think of the call stack as a pile of dishes.

- Each dish = a function call.

- JavaScript is single-threaded, so only one dish (function) is worked on at a time.

- Last in, first out (LIFO): The last function added is the first one to be removed.

Flow:

- A function is called → pushed to the stack.

- Inside that function, if another function is called → push it too.

- When a function finishes → pop it from the stack.

- Repeat until stack is empty.

2️⃣ Event Loop — The Traffic Controller

The event loop constantly checks:

- Is the call stack empty?

  - If no, keep running what’s there.

  - If yes, check the callback queue (or microtask queue) and push the next task into the stack.

- Its job:

  - Move tasks from queues into the call stack when it’s free.

3️⃣ The Queues

JavaScript has two main queues the event loop watches:

1. Callback Queue (Task Queue)

   - Holds things like setTimeout callbacks, DOM events.

2. Microtask Queue

   - Holds promises (.then), mutation observers.

   - Runs before the callback queue.

4️⃣ How They Work Together

Let’s visualize the relationship between call stack, event loop, and queues:

     ┌───────────────────────────┐
     │        Call Stack          │
     └───────────┬───────────────┘
                 │
        (executing functions)
                 │
          ┌──────┴──────┐
          │ Event Loop  │  <- Keeps checking
          └──────┬──────┘
                 │
      ┌──────────┴──────────┐
      │  Microtask Queue    │ <- Runs first (Promises)
      │  Callback Queue     │ <- Runs next (setTimeout, etc.)
      └─────────────────────┘

5️⃣ Example: Synchronous + Asynchronous Code

    console.log("Start");

    setTimeout(() => {
        console.log("Timeout callback");
    }, 0);

    Promise.resolve().then(() => {
        console.log("Promise microtask");
    });

    console.log("End");

Execution Flow:

console.log("Start") → runs immediately → stack.

setTimeout(...) → sends callback to callback queue.

Promise.then(...) → sends callback to microtask queue.

console.log("End") → runs immediately.

Call stack empty? Yes → event loop checks microtask queue first → runs Promise microtask.

Then runs the callback queue → Timeout callback.

So the output is =>
Start
End
Promise microtask
Timeout callback

6️⃣ Quick Mental Model =>

- Call Stack: What’s running right now.

- Event Loop: The guy at the door letting new tasks in when there’s space.

- Queues: Waiting rooms for different types of async work.

# Difference between var, let, and const.

| Feature   | `var`                        | `let`    | `const`       |
| --------- | ---------------------------- | -------- | ------------- |
| Scope     | Function/Global              | Block    | Block         |
| Hoisting  | ✅ (initialized `undefined`) | ✅ (TDZ) | ✅ (TDZ)      |
| Redeclare | ✅ Yes                       | ❌ No    | ❌ No         |
| Reassign  | ✅ Yes                       | ✅ Yes   | ❌ No (value) |

# Temporal Dead Zone(let and const variables)

=> A temporal dead zone (TDZ) is the area of a block where a variable is inaccessible until the moment the computer completely initializes it with a value.

# Explain hoisting.

=> Hoisting in JavaScript refers to the mechanism where variable and function declarations are conceptually moved to the top of their containing scope during the compilation phase, before the code actually executes. This means that you can use variables and functions before their formal declaration appears in the code.

| Type                      | Hoisted? | Initialized? | Access before declaration   |
| ------------------------- | -------- | ------------ | --------------------------- |
| `var`                     | ✅ Yes   | ✅ undefined | Allowed (gives `undefined`) |
| `let` / `const`           | ✅ Yes   | ❌ No        | ❌ ReferenceError (TDZ)     |
| Function Declaration      | ✅ Yes   | ✅ Yes       | Allowed                     |
| Function Expression (var) | ✅ Yes   | ✅ undefined | ❌ TypeError                |

# What is closure? Give an example.

- A closure is when a function remembers and can access variables from its outer scope, even after that outer function has finished executing.

- Closures happen because of:

  - Lexical scope → Variables are looked up in the scope where the function was defined.

  - Functions in JavaScript keep a reference to their outer scope’s variables.

- Example -
  function outerFunction() {
  let count = 0; // variable in outer scope

  function innerFunction() {
  count++;
  console.log(count);
  }

  return innerFunction;
  }

  const counter = outerFunction();

counter(); // 1
counter(); // 2
counter(); // 3

# What is the "this" keyword in JavaScript and how it changes in arrow functions?

=> In JavaScript, "this" is a special keyword that refers to the object that is currently calling the function.

- "this" does not refer to the function itself.

- The value of this is determined at runtime, based on how a function is called — not where it’s defined.

| Context                            | What `this` refers to                                            |
| ---------------------------------- | ---------------------------------------------------------------- |
| **Global scope (non-strict mode)** | The global object (`window` in browsers, `global` in Node.js)    |
| **Global scope (strict mode)**     | `undefined`                                                      |
| **Inside a method**                | The object the method is called on                               |
| **Inside a function (non-strict)** | The global object                                                |
| **Inside a function (strict)**     | `undefined`                                                      |
| **Inside an event listener**       | The element that triggered the event                             |
| **Inside an arrow function**       | `this` from its **lexical scope** (does not bind its own `this`) |

- Example: Normal Function vs Arrow Function

1. Normal Function

const obj = {
value: 42,
normalFunc: function () {
console.log(this.value);
}
};

obj.normalFunc(); // Output => 42 (this → obj)

2. Arrow Function

const obj = {
value: 42,
arrowFunc: () => {
console.log(this.value);
}
};

obj.arrowFunc(); // Output => undefined (this → inherited from outer scope, likely window/global)

=> Why Arrow Functions Are Different

- Arrow functions do not have their own "this".

- They lexically inherit "this" from the scope in which they were created.

- Great for callbacks where you want to preserve the outer this.

- Example where Arrow Function Helps

function Timer() {
this.seconds = 0;

setInterval(() => {
this.seconds++;
console.log(this.seconds);
}, 1000);
}

new Timer();

- Here, the arrow function inside setInterval inherits this from Timer.

- If we used a normal function, this would refer to the global object instead of the Timer instance.

| Feature        | Normal Function                | Arrow Function                     |
| -------------- | ------------------------------ | ---------------------------------- |
| Own `this`?    | ✅ Yes                         | ❌ No                              |
| `this` binding | Dynamic (depends on caller)    | Lexical (from outer scope)         |
| Best use case  | Object methods, dynamic `this` | Callbacks, preserving outer `this` |

# Explain prototypal inheritance. (Check qna for example)

- In JavaScript, objects can inherit properties and methods from other objects through a chain called the prototype chain.

- Every object has an internal link ([[Prototype]]) to another object.

- That linked object is called the prototype.

- If a property/method is not found on the object itself, JS looks for it in the prototype, then the prototype’s prototype, and so on — until it reaches null.

=> When you create objects using a constructor function:

- All instances share methods through the constructor’s .prototype object.

# What is debouncing vs throttling? Implement both.

1️⃣ Debouncing

Definition:
Debouncing means grouping a series of rapid calls into a single call, executed only after a specified delay since the last call.

=> When to use:

- Search box input (wait until user stops typing).

- Window resize event (wait until resizing stops).

2️⃣ Throttling

Definition:
Throttling means ensuring a function is called at most once every X milliseconds, no matter how many times it’s triggered.

=> When to use:

- Scroll events (limit frequency of execution).

- Mouse move tracking.

- Button spam prevention.

3️⃣ Key Difference Table

| Feature          | Debouncing                         | Throttling                               |
| ---------------- | ---------------------------------- | ---------------------------------------- |
| Execution timing | After user stops triggering events | At regular intervals while events happen |
| Use case         | Delay action until input is done   | Limit frequency of action                |
| Example          | Search bar, form validation        | Scroll tracking, resizing UI elements    |

# What is Promise? Explain states of a promise.

=> A Promise is a JavaScript object that represents the eventual completion or failure of an asynchronous operation.

| State         | Meaning                                                         | Can Change To             |
| ------------- | --------------------------------------------------------------- | ------------------------- |
| **pending**   | The async operation is still in progress.                       | `fulfilled` or `rejected` |
| **fulfilled** | The async operation completed successfully and has a **value**. | _(final state)_           |
| **rejected**  | The async operation failed and has a **reason** (error).        | _(final state)_           |

=> 5️⃣ Key Points

    - then() → Handles the fulfilled value.

    - catch() → Handles the rejected reason.

    - finally() → Runs regardless of success or failure.

    - Promises are chainable.

# Difference between async/await and .then().

1️⃣ Both Handle Promises

    - .then() and async/await are just two different ways of working with Promises.

    - async/await is essentially syntactic sugar over .then() that makes asynchronous code look synchronous.

- Major Differences

  | Feature                  | `.then()`                                    | `async/await`                             |
  | ------------------------ | -------------------------------------------- | ----------------------------------------- |
  | **Code style**           | Chained callbacks                            | Looks synchronous                         |
  | **Readability**          | Can get messy if many steps (promise chains) | Cleaner, easier to follow                 |
  | **Error handling**       | `.catch()` for errors                        | `try...catch` for errors                  |
  | **Debugging**            | Stack traces can be harder to follow         | Easier to debug with normal `try...catch` |
  | **Sequential execution** | Must chain manually                          | Natural with `await`                      |
  | **Parallel execution**   | Use `Promise.all()`                          | Still use `Promise.all()` with `await`    |

- Important Points

  - Inside an async function, await pauses execution until the promise resolves/rejects.

  - await can only be used inside functions declared with async.

  - .then() works anywhere — no need for async keyword.

  - Under the hood, async/await still uses promises — it’s not a separate mechanism.

# Explain shallow copy vs deep copy in JavaScript.

1️⃣ Shallow Copy

A shallow copy creates a new object, but nested objects/arrays are still referenced, not cloned.

    - Only the first level is copied.

    - Changes in nested objects affect both copies.

📌 Common shallow copy methods:

    - Spread operator { ...obj }

    - Object.assign({}, obj)

    - Array.prototype.slice() or concat()

2️⃣ Deep Copy

A deep copy creates a completely independent clone, including all nested objects/arrays.

    - No shared references.

    - Changes in one do not affect the other.

📌 Ways to deep copy:

    - JSON.parse(JSON.stringify(obj) → simple but loses functions, undefined, Date, etc.

    - structuredClone(obj) → modern and preserves more data types.

    - Libraries like Lodash: \_.cloneDeep(obj)

=> Shallow copy is faster because it doesnt clone everything
=> Use Deep copy when you need full isolation from the original object's nested data

# How does garbage collection work in JS?
