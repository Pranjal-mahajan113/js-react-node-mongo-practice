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