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
