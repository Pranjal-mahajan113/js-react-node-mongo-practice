// ============================================================================
// ⚡ SETIMMEDIATE REVISION — 9 JUNE 2026
// ============================================================================



// 🟦 Q1 ======================================================================

const fs = require("fs");

console.log("A");

fs.readFile(__filename, () => {
  console.log("B");

  setImmediate(() => {
    console.log("C");
  });

  setTimeout(() => {
    console.log("D");
  }, 0);
});

console.log("E");

/*

❌ MY OUTPUT:
A
E
D
B
C

✅ CORRECT OUTPUT:
A
E
B
C
D

❌ MISTAKE:

I thought:
setTimeout(0) runs before everything else

❌ Wrong.

Important rule:

Inside I/O callback:

setImmediate()
ALWAYS executes before
setTimeout(0)

📘 FLOW:

Sync:
A
E

I/O callback:
B

Schedules:

setImmediate → C
setTimeout → D

Node leaves Poll Phase

Check Phase:
C

Next Event Loop:
D

📘 LEARNED:

🔥 INSIDE I/O CALLBACK

setImmediate
>
setTimeout(0)

This is one of the most common
Node.js interview questions.

*/



// 🟦 Q2 ======================================================================

console.log("1");

setImmediate(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });
});

Promise.resolve().then(() => {
  console.log("4");
});

console.log("5");

/*

✅ MY OUTPUT:
1
5
4
2
3

✔ CORRECT

📘 FLOW:

Sync:
1
5

Microtask Queue:
[4]

Execute:
4

Check Phase:
2

Inside setImmediate:

Promise.then(3)

After callback finishes:

3

📘 LEARNED:

✔ Promise microtasks always finish
before setImmediate

✔ Promise created INSIDE setImmediate
runs immediately after callback ends

*/



// 🟦 Q3 ======================================================================

const fs = require("fs");

console.log("start");

fs.readFile(__filename, () => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });

  setImmediate(() => {
    console.log("C");
  });

  process.nextTick(() => {
    console.log("D");
  });
});

setImmediate(() => {
  console.log("E");
});

console.log("end");

/*

❌ MY OUTPUT:
start
end
C
D
E
A
B

✅ CORRECT OUTPUT:
start
end
E
A
D
B
C

❌ MISTAKE #1

I printed:

C before A

Impossible.

Because:

C is created INSIDE

fs.readFile callback

So:

A must happen first.

------------------------------------------------

❌ MISTAKE #2

I printed:

D before E

Impossible.

D doesn't exist until:

fs callback executes.

E was already scheduled
at top level.

------------------------------------------------

📘 FLOW:

Sync:
start
end

Top-level setImmediate:
E

Later I/O completes:

A

Inside callback:

nextTick → D
Promise → B
setImmediate → C

Priority:

nextTick
>
Promise
>
setImmediate

Final:

start
end
E
A
D
B
C

📘 LEARNED:

Inside I/O callback:

process.nextTick
>
Promise.then
>
setImmediate

Always remember:

nextTick wins first.

*/




// ============================================================================
// 🏆 SETIMMEDIATE CHEAT SHEET
// ============================================================================

/*

TOP LEVEL

setTimeout(0)
vs
setImmediate()

❌ Order NOT guaranteed

--------------------------------

INSIDE I/O CALLBACK

setImmediate()
>
setTimeout(0)

✔ Guaranteed

--------------------------------

Priority Inside I/O

process.nextTick
>
Promise.then
>
setImmediate

--------------------------------

Mental Model

Poll Phase (I/O)
      ↓
process.nextTick
      ↓
Promise.then
      ↓
Check Phase
(setImmediate)
      ↓
Next Loop
(setTimeout)

🔥 Memorize this ladder.

*/