// ============================================================================
// ⚡ NODE.JS I/O + nextTick + Promise + setImmediate
// — 31 MAY 2026 PRACTICE
// ============================================================================



// 🟦 Q1 ======================================================================

const fs = require("fs");

console.log("A");

fs.readFile(__filename, () => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

  process.nextTick(() => {
    console.log("D");
  });

  setImmediate(() => {
    console.log("E");
  });
});

Promise.resolve().then(() => {
  console.log("F");
});

process.nextTick(() => {
  console.log("G");
});

console.log("H");

/*

✅ MY ANSWER:
A H G F B D C E

✔ CORRECT

📘 FLOW:

Sync:
A
H

nextTick:
G

Promise:
F

I/O callback:
B

Inside I/O:

nextTick:
D

Promise:
C

check phase:
E

📘 LEARNED:

Inside I/O callback:

process.nextTick
>
Promise
>
setImmediate

✔ Perfect

*/



// 🟦 Q2 ======================================================================

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

process.nextTick(() => {
  console.log("5");
});

console.log("6");

/*

❌ MY ANSWER:
1 6 5 2 4 3

✅ CORRECT OUTPUT:
1 6 5 2 3 4

❌ MISTAKE:

I thought:

4 executes immediately
after 2

BUT:

2 returns:

Promise.resolve().then(() => {
  console.log("3");
});

That inner Promise must finish first.

Flow:

Sync:
1
6

nextTick:
5

Promise:
2

Queue now:
[3]

3 executes

Returned Promise resolves

Now:
4 enters queue

Then:
4

📘 LEARNED:

✔ Returning a Promise delays
next .then() in chain

Chain waits for returned Promise.

*/



// 🟦 Q3 ======================================================================

console.log("start");

async function foo() {
  console.log("A");

  await Promise.resolve();

  console.log("B");

  await Promise.resolve();

  console.log("C");
}

Promise.resolve().then(() => {
  console.log("D");
});

process.nextTick(() => {
  console.log("E");
});

foo();

console.log("end");

/*

✅ MY ANSWER:
start A end E D B C

✔ CORRECT

📘 FLOW:

Sync:
start
A
end

nextTick:
E

Promise queue:
D

await continuation:
B

Second await:
adds C later

Queue becomes:
[B, C]

Final:
D
B
C

📘 LEARNED:

nextTick
>
Promise.then
>
await continuations
(by insertion timing)

*/



// 🟦 Q4 ======================================================================

const fs = require("fs");

console.log("1");

setImmediate(() => {
  console.log("2");
});

fs.readFile(__filename, () => {
  console.log("3");

  process.nextTick(() => {
    console.log("4");
  });

  Promise.resolve().then(() => {
    console.log("5");
  });

  setTimeout(() => {
    console.log("6");
  }, 0);
});

Promise.resolve().then(() => {
  console.log("7");
});

process.nextTick(() => {
  console.log("8");
});

console.log("9");

/*

❌ MY ANSWER:
1 9 8 7 3 4 5 2 6

❌ MISTAKE:

You assumed:
fs.readFile callback executes
before setImmediate

BUT this is Node.js classic rule.

📘 CORRECT FLOW:

Sync:
1
9

nextTick:
8

Promise:
7

check phase:
2

THEN sometime later:
fs.readFile callback

3

Inside callback:

nextTick:
4

Promise:
5

timer:
6

✅ CORRECT OUTPUT:

1
9
8
7
2
3
4
5
6

📘 LEARNED:

Top-level:

setImmediate()
often executes before
fs.readFile callback finishes.

BUT:

Inside I/O callback:

setImmediate()
would execute before
setTimeout()

⚠ Important distinction:

TOP LEVEL:
setImmediate vs I/O completion
depends on when I/O finishes.

INSIDE I/O CALLBACK:
setImmediate always beats setTimeout(0).

*/




// ============================================================================
// 🏆 STATUS — 31 MAY 2026
// ============================================================================

/*

Current strengths:

✔ Promise chains
✔ async/await continuations
✔ nextTick priority
✔ I/O callback ordering
✔ nested microtasks
✔ timer → microtask drain cycle

Still watch carefully:

⚠ Returned Promises inside chains
⚠ setImmediate vs I/O timing
⚠ top-level setImmediate behavior

You're now solving questions by
tracking queue insertion order,
which is exactly how Node.js
event-loop interview questions are solved.

*/