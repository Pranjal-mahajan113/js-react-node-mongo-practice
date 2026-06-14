// Q1
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");

  Promise.resolve().then(() => {
    console.log("4");
  });
});

console.log("5");


// Q2
console.log("A");

async function foo() {
  console.log("B");

  await Promise.resolve();

  console.log("C");

  await Promise.resolve();

  console.log("D");
}

Promise.resolve().then(() => {
  console.log("E");
});

foo();

console.log("F");


// Q3 
console.log("1");

Promise.resolve()
  .then(() => {
    console.log("2");

    return Promise.resolve().then(() => {
      console.log("3");
    });
  })
  .then(() => {
    console.log("4");
  });

Promise.resolve().then(() => {
  console.log("5");
});

console.log("6");



// Q4 
console.log("start");

async function foo() {
  console.log("A");

  await Promise.resolve();

  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

  await Promise.resolve();

  console.log("D");
}

foo();

Promise.resolve().then(() => {
  console.log("E");
});

console.log("end");


// Q5 (LinkedIn-worthy)
console.log("1");

setTimeout(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("4");

  setTimeout(() => {
    console.log("5");
  }, 0);
});

console.log("6");