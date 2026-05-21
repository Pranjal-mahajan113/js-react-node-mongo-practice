console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => {
    console.log("C");
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log("D");
    setTimeout(() => {
      console.log("E");
    }, 0);
  })
  .then(() => {});

console.log("F");

(async function () {
  console.log("G");
  await Promise.resolve();
  console.log("H");
  await Promise.resolve();
  console.log("I");
})();

console.log("J");
//MY Outout:-A,F,G,J,D,H,I,B,E,C
//Correct:-A, F, G, J, D, H, I, B, C, E
