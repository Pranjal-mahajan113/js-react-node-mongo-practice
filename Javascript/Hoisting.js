// ============================================================================
// 🧠 HOISTING + TDZ + CLOSURE PRACTICE — 16 MAY 2026
// ============================================================================



// 🟦 Q1 — Hoisting + var ================================================

console.log(a);

var a = 10;

function test() {
  console.log(a);

  var a = 20;

  console.log(a);
}

test();

console.log(a);

/*

✅ OUTPUT:
undefined
undefined
20
10

✔ Correct

📘 LEARNED:

During Memory Creation Phase:

Global:
var a = undefined

Inside test():
var a = undefined

Execution Flow:

console.log(a)
→ undefined

a = 10

test():

console.log(a)
→ local a exists
→ currently undefined

a = 20

console.log(a)
→ 20

Outside:
global a = 10

📘 IMPORTANT:

var is hoisted
AND initialized with undefined.

*/



// 🟦 Q2 — let/const + TDZ ===============================================

let a = 5;

function demo() {
  console.log(a);

  let a = 10;

  console.log(a);
}

demo();

/*

❌ MY OUTPUT:
Reference Error TDZ, 10

✅ CORRECT OUTPUT:
ReferenceError:
Cannot access 'a' before initialization

❌ MISTAKE:

I thought:
let variables become undefined
during memory phase

❌ Wrong.

For let and const:

✔ Memory is allocated
❌ BUT not initialized

That uninitialized phase is called:

🧠 TDZ (Temporal Dead Zone)

Execution:

Inside demo():

local let a exists

So JS DOES NOT look outside.

BUT:

local a is still uninitialized

Therefore:

console.log(a)
→ ReferenceError

📘 LEARNED:

var:
✔ hoisted
✔ initialized as undefined

let / const:
✔ hoisted
❌ NOT initialized

*/



// 🟦 Q3 — Closures =======================================================

function outer() {
  let count = 0;

  return function inner() {
    count++;

    console.log(count);
  };
}

const fn1 = outer();

fn1();
fn1();

const fn2 = outer();

fn2();
fn1();

/*

✅ OUTPUT:
1
2
1
3

✔ Correct

📘 LEARNED:

Each function call gets
its OWN lexical environment.

fn1:

count = 0
→ 1
→ 2

fn2:

NEW execution context
NEW count variable

starts fresh:
→ 1

fn1 still remembers old count:
→ 3

📘 BIGGEST CONCEPT:

Closure =
Function + remembered lexical environment

Even after outer() finishes,
inner() still remembers count.

*/