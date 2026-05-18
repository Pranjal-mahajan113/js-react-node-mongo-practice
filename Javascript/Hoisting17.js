//q1
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
//My output:-4,4,4 beacuse var is function scoped first it 1,2,3,but execute time return 4

//Q2
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
//my output:-1,2,3-let is block scope create new scope each

//Q3.
var a = 100;

{
  var a = 10;
  let b = 20;
}

console.log(a);

// console.log(b);
//my output:10,referce erroe becuse call in out of block scope