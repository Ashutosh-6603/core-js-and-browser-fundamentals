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

const shallowCopy = { ...original }; // spread operator

shallowCopy.name = "John"; // ✅ changes only in copy
shallowCopy.address.city = "Delhi"; // ⚠ changes in both!

console.log(original.address.city); // "Delhi" — because nested object was shared

// Example of deep copy
const originalForDeep = {
  name: "Ashutosh",
  address: { city: "Bhubaneswar", pin: 751001 },
};

// Simple deep copy using JSON
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.address.city = "Delhi"; // changes only in copy

console.log(original.address.city); // "Bhubaneswar" — stays intact

// Simple deep copy using structuredClone
const deepCopy = structuredClone(original);

// Modify the copy
deepCopy.address.city = "Delhi";
deepCopy.hobbies.push("traveling");

console.log(original.address.city); // "Bhubaneswar" ✅ stays unchanged
console.log(original.hobbies); // ["coding", "music"] ✅ unaffected
console.log(deepCopy.hobbies); // ["coding", "music", "traveling"]

// ----------------------------------------------------------------------------- //
