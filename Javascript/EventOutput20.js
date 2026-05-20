//Question 1
console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

}, 0);

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");
//My output:

//Question 2
console.log("1");

async function foo() {
  console.log("2");

  await Promise.resolve();

  console.log("3");
}

Promise.resolve().then(() => {
  console.log("4");
});

foo();

console.log("5");

//Q3
console.log("start");

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("promise");
});

setImmediate(() => {
  console.log("immediate");
});

setTimeout(() => {
  console.log("timeout");
}, 0);

console.log("end");

//Q4

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


//Q5

console.log("1");

async function test() {
  console.log("2");

  process.nextTick(() => {
    console.log("3");
  });

  await Promise.resolve();

  console.log("4");

  Promise.resolve().then(() => {
    console.log("5");
  });
}

setTimeout(() => {
  console.log("6");
}, 0);

Promise.resolve().then(() => {
  console.log("7");
});

test();

console.log("8");









console.log("1");

async function foo() {
  console.log("2");

  await Promise.resolve();

  console.log("3");

  process.nextTick(() => {
    console.log("4");
  });
}

Promise.resolve().then(() => {
  console.log("5");
});

foo();

console.log("6");