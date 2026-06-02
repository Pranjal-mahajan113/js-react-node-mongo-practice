console.log("1");

Promise.reject()
  .catch(() => {
    console.log("2");
    return "A";
  })
  .finally(() => {
    console.log("3");
  })
  .then((v) => {
    console.log("4", v);
  });

console.log("5");

//MY Output:-1,5,2,4,A -->WROng


// Question 2 — Async + Promise Chain
console.log("A");

async function foo() {
  console.log("B");

  await Promise.resolve();

  console.log("C");

  return Promise.resolve().then(() => {
    console.log("D");
  });
}

foo().then(() => {
  console.log("E");
});

Promise.resolve().then(() => {
  console.log("F");
});

console.log("G");
//MY Output:-A,B,G,C,D,E,F

// Question 3 — Multiple readFile 🔥
const fs = require("fs");

console.log("1");

fs.readFile(__filename, () => {
  console.log("2");

  process.nextTick(() => {
    console.log("3");
  });
});

fs.readFile(__filename, () => {
  console.log("4");

  Promise.resolve().then(() => {
    console.log("5");
  });
});

console.log("6");
//MY Output:

// Question 4 — Nested setImmediate
console.log("start");

setImmediate(() => {
  console.log("A");

  setImmediate(() => {
    console.log("B");
  });

  Promise.resolve().then(() => {
    console.log("C");
  });
});

Promise.resolve().then(() => {
  console.log("D");
});

console.log("end");

//MY Output: