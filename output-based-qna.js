// Examples of Closures
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// Actual output is
/*
4
4
4
*/

// But if i change the variable from "var" to "let" which is

for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// Now the output is
/*
1
2
3
*/

// ----------------------------------------------------------------------------- //

// Example for Prototypal Inheritance
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const rabbit = {
  jumps: true,
};

// Set animal as the prototype of rabbit
rabbit.__proto__ = animal;

console.log(rabbit.eats); // true (inherited from animal)
rabbit.walk(); // "Animal walks" (inherited method)

// ----------------------------------------------------------------------------- //

// Implementation of Debouncing
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Example usage:
const onSearch = debounce((text) => {
  console.log("Searching for:", text);
}, 500);

document.getElementById("search").addEventListener("input", (e) => {
  onSearch(e.target.value);
});

// Implementation of Throttling
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Example usage:
const onScroll = throttle(() => {
  console.log("Scroll event at", new Date().toISOString());
}, 1000);

window.addEventListener("scroll", onScroll);

// ----------------------------------------------------------------------------- //

// Example of a Promise

const myPromise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("Data fetched successfully!");
    } else {
      reject("Failed to fetch data");
    }
  }, 1000);
});

myPromise
  .then((result) => console.log(result)) // if fulfilled
  .catch((error) => console.error(error)) // if rejected
  .finally(() => console.log("Promise settled"));

// ----------------------------------------------------------------------------- //

// Example for .then()

fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
  .finally(() => console.log("Request done"));

// Example for async/await
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request done");
  }
}
getData();

// ----------------------------------------------------------------------------- //

// Example of callback hell and how to fix it with Promises or async/await

// Callback hell
const fs = require("fs");

fs.readFile("file1.txt", "utf8", (err, data1) => {
  if (err) return console.error(err);
  console.log("File 1:", data1);

  fs.readFile("file2.txt", "utf8", (err, data2) => {
    if (err) return console.error(err);
    console.log("File 2:", data2);

    fs.readFile("file3.txt", "utf8", (err, data3) => {
      if (err) return console.error(err);
      console.log("File 3:", data3);

      fs.readFile("file4.txt", "utf8", (err, data4) => {
        if (err) return console.error(err);
        console.log("File 4:", data4);

        console.log("All files read successfully!");
      });
    });
  });
});

// Fix Using Promises:

const fs = require("fs").promises;

fs.readFile("file1.txt", "utf8")
  .then((data1) => {
    console.log("File 1:", data1);
    return fs.readFile("file2.txt", "utf8");
  })
  .then((data2) => {
    console.log("File 2:", data2);
    return fs.readFile("file3.txt", "utf8");
  })
  .then((data3) => {
    console.log("File 3:", data3);
    return fs.readFile("file4.txt", "utf8");
  })
  .then((data4) => {
    console.log("File 4:", data4);
    console.log("All files read successfully!");
  })
  .catch(console.error);

// Fix using async/await:

const fs = require("fs").promises;

async function readFiles() {
  try {
    const data1 = await fs.readFile("file1.txt", "utf8");
    console.log("File 1:", data1);

    const data2 = await fs.readFile("file2.txt", "utf8");
    console.log("File 2:", data2);

    const data3 = await fs.readFile("file3.txt", "utf8");
    console.log("File 3:", data3);

    const data4 = await fs.readFile("file4.txt", "utf8");
    console.log("File 4:", data4);

    console.log("All files read successfully!");
  } catch (err) {
    console.error(err);
  }
}

readFiles();

// ----------------------------------------------------------------------------- //

// Example of shallow copy
const originalForShallow = {
  name: "Ashutosh",
  address: { city: "Bhubaneswar", pin: 751001 },
};

const shallowCopy = { ...originalForShallow }; // spread operator

shallowCopy.name = "John"; // ✅ changes only in copy
shallowCopy.address.city = "Delhi"; // ⚠ changes in both!

console.log(originalForShallow.address.city); // "Delhi" — because nested object was shared

// Example of deep copy
const originalForDeep = {
  name: "Ashutosh",
  address: { city: "Bhubaneswar", pin: 751001 },
};

// Simple deep copy using JSON
const deepCopy = JSON.parse(JSON.stringify(originalForDeep));

deepCopy.address.city = "Delhi"; // changes only in copy

console.log(originalForDeep.address.city); // "Bhubaneswar" — stays intact

// Simple deep copy using structuredClone
const deepCopy = structuredClone(originalForDeep);

// Modify the copy
deepCopy.address.city = "Delhi";
deepCopy.hobbies.push("traveling");

console.log(original.address.city); // "Bhubaneswar" ✅ stays unchanged
console.log(original.hobbies); // ["coding", "music"] ✅ unaffected
console.log(deepCopy.hobbies); // ["coding", "music", "traveling"]

// ----------------------------------------------------------------------------- //

// How to handle CORS in nodejs

const express = require("express");
const cors = require("cors");

const app = express();

// This is the client endpoint to allow requests and response to takwe place between
app.use(cors({ origin: "https://myapp.com" }));

app.get("/data", (req, res) => {
  res.json({ message: "CORS enabled!" });
});

app.listen(3000);

// ----------------------------------------------------------------------------- //

// Polyfill for Array.map()
Array.prototype.myMap = function (callback) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    temp.push(callback(this[i], i, this));
  }

  return temp;
};

const numsForMap = [1, 2, 3, 4];

const multiply = numsForMap.myMap((x) => {
  return x * 2;
});

console.log(multiply);

// Polyfill for Array.filter()

Array.prototype.myFilter = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) temp.push(this[i]);
  }
  return temp;
};

const numsForFilter = [1, 2, 3, 4];

const FilterOdd = numsForFilter.myFilter((x) => {
  return x % 2;
});

console.log(FilterOdd);

// Polyfill for reduce()

Array.prototype.myReduce = function (callback, initial_value) {
  var acc = initial_value;
  for (let i = 0; i < this.length; i++) {
    acc = acc ? callback(acc, this[i], i, this) : this[i];
  }
  return acc;
};

const nums = [1, 2, 3, 4];

const sum = nums.myReduce((acc, curr, i, nums) => {
  return acc + curr;
}, 0);

console.log(sum);

// ----------------------------------------------------------------------------- //

// Example without eventg delegation
// Attaching click event to each button individually
// So if one adds a button dynamically later, it wont possess this event
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Button clicked:", button.innerText);
  });
});

// Example with event delegation
const container = document.getElementById("button-container");

// Attach only ONE event listener
// In this case, even if a button is added dynamically with the required class, then it will possess the event
container.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("btn")) {
    console.log("Button clicked:", event.target.innerText);
  }
});

// ----------------------------------------------------------------------------- //

// Example of Higher Order Function
const higherOrderFunctionNums = [1, 2, 3, 4, 5];

const squares = higherOrderFunctionNums.map((n) => n * 2); // [2,4,6,8,10]
const evens = higherOrderFunctionNums.filter((n) => n % 2 === 0); // [2,4]
const sums = higherOrderFunctionNums.reduce((acc, n) => acc + n, 0); // 15

// Example of Currying
// Curried function for building API endpoints
function apiBuilder(baseUrl) {
  return function (resource) {
    return function (id) {
      return `${baseUrl}/${resource}/${id}`;
    };
  };
}

// Initialize for environment
const prodApi = apiBuilder("https://api.myapp.com");
const devApi = apiBuilder("http://localhost:4000");

// Specific resource helpers
const userApi = prodApi("users");
const orderApi = prodApi("orders");

console.log(userApi(123)); // https://api.myapp.com/users/123
console.log(orderApi(789)); // https://api.myapp.com/orders/789

// ----------------------------------------------------------------------------- //

// Example of call, apply and bind
// Call and Apply
const student = { name: "Neha" };
const teacher = { name: "Rahul" };

function introduce(subject) {
  console.log(`I am ${this.name}, I teach/learn ${subject}`);
}

introduce.call(student, "Math"); // I am Neha, I teach/learn Math
introduce.apply(teacher, ["Physics"]); // I am Rahul, I teach/learn Physics

// Bind
const person = {
  name: "Ashutosh",
  greet: function () {
    console.log("Hello, I am " + this.name);
  },
};

const boundGreet = person.greet.bind(person);
boundGreet();
// ✅ "Hello, I am Ashutosh"

// ----------------------------------------------------------------------------- //

// ES6+ Features (Destructuring, Spread, Rest, Optional Chaining)

// Destructuring
const userDestructuring = { id: 1, name: "Ashutosh", role: "Developer" };

// ES6 Destructuring
const { name, role } = user;
console.log(name, role); // "Ashutosh", "Developer"

// Spread Operator
// Example Array
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];

console.log(merged); // [1, 2, 3, 4]

// Example Object
const user = { name: "Ashutosh", role: "Dev" };
const updatedUser = { ...user, role: "Senior Dev" };

console.log(updatedUser);
// { name: "Ashutosh", role: "Senior Dev" }

// Rest Operator
// Function Params
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// Example Object
const userRest = { id: 1, name: "Ashutosh", role: "Dev" };
const { id, ...rest } = userRest;

console.log(id); // 1
console.log(rest); // { name: "Ashutosh", role: "Dev" }

// Optional Chaining
const userOptionalChaining = {
  profile: {
    name: "Ashutosh",
  },
};

console.log(userOptionalChaining.profile?.name); // "Ashutosh"
console.log(userOptionalChaining.address?.city); // undefined (no error)
