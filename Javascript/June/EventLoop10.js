// Question 1
console.log("A");

Promise.resolve().then(() => {
  console.log("B");

  process.nextTick(() => {
    console.log("C");
  });
});

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");

//My answe:-A,E,B,D,C

// Question 2
console.log("1");

process.nextTick(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });
});

Promise.resolve().then(() => {
  console.log("4");
});

console.log("5");
//MY ANSWER:-

// Question 3
console.log("start");

Promise.resolve().then(() => {
  console.log("A");

  process.nextTick(() => {
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