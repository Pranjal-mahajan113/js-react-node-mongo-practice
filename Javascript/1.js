// function outer() {
//   let count = 0;

//   return function () {
//     count++;

//     setTimeout(() => {
//       console.log(count);
//     }, 1000);
//   };
// }

// const fn = outer();

// fn();
// fn();
// fn();
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count)
  };
}
const call = outer();
call();
