var a = 1;

function outer() {
  console.log(a);

  if (!a) {
    var a = 2;
  }

  function inner() {
    console.log(a);
    a = 3;
  }

  inner();

  console.log(a);
}

outer();

console.log(a);