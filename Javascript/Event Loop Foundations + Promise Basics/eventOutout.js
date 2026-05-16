// eventloop.js

// ============================================================================
// ⚡ EVENT LOOP PRACTICE — 16 MAY 2026
// ============================================================================



// 🟦 Q1 ======================================================================

console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

/*

✅ OUTPUT:
start
end
promise
timeout

📘 LEARNED:
✔ Synchronous code runs first
✔ Promise.then() → Microtask Queue
✔ setTimeout() → Macrotask Queue
✔ Microtasks execute before Macrotasks

*/



// 🟦 Q2 ======================================================================

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");

  setTimeout(() => {
    console.log("D");
  }, 0);
});

console.log("E");

/*

❌ MY OUTPUT:
A E C D B

✅ CORRECT OUTPUT:
A E C B D

❌ MISTAKE:
I assumed:
Promise ke andar wala setTimeout(D)
pehle chalega than B

BUT:

B timer registered first
Then D timer registered later

Macrotask Queue:
[B, D]

✔ FIFO (First In First Out)

📘 LEARNED:
setTimeout queue also follows FIFO.

*/



// 🟦 Q3 ======================================================================

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

Promise.resolve().then(() => {
  console.log("4");
});

console.log("5");

/*

✅ OUTPUT:
1 5 3 4 2

✔ Correct

📘 LEARNED:

Microtask Queue:
[3, 4]

3 entered first
4 entered second

✔ Microtasks are FIFO

*/



// 🟦 Q4 ======================================================================

console.log("start");

setTimeout(() => {
  console.log("timeout1");

  Promise.resolve().then(() => {
    console.log("promise1");
  });
}, 0);

setTimeout(() => {
  console.log("timeout2");
}, 0);

console.log("end");

/*

✅ OUTPUT:
start
end
timeout1
promise1
timeout2

✔ Correct

📘 LEARNED:

After ONE macrotask:
timeout1

JS immediately drains ALL microtasks:
promise1

THEN moves to next macrotask:
timeout2

✔ After each macrotask → microtasks are drained

*/



// 🟦 Q5 ======================================================================

console.log("A");

Promise.resolve().then(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });
});

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");

/*

❌ MY OUTPUT:
A E B C D

✅ CORRECT OUTPUT:
A E B D C

❌ MISTAKE:

I thought:
When B executes,
C immediately enters before D

BUT:

Initial Microtask Queue:
[B, D]

When B runs:
THEN C gets added

Updated Queue:
[D, C]

📘 LEARNED:

Nested microtasks are added
to the END of queue.

✔ FIFO still applies

*/



// 🟦 Q6 ======================================================================

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

/*

✅ OUTPUT:
1 6 4 2 3 5

✔ Correct

📘 GOLDEN RULE:

Sync
→ All Microtasks
→ One Macrotask
→ All Microtasks
→ Next Macrotask

⚠ INTERVIEW TRAP:

❌ Wrong:
All timers execute together

✅ Correct:
After EACH macrotask,
microtasks are fully drained.

*/



// 🟦 Q7 ======================================================================

console.log("A");

async function foo() {
  console.log("B");

  await Promise.resolve();

  console.log("C");
}

foo();

console.log("D");

/*

✅ OUTPUT:
A B D C

✔ Correct

📘 LEARNED:

Async function executes synchronously
UNTIL first await.

Flow:

A
B   ← sync
D   ← remaining sync code
C   ← after await (microtask)

*/



// 🟦 Q8 ======================================================================

console.log("1");

async function async1() {
  console.log("2");

  await async2();

  console.log("3");
}

async function async2() {
  console.log("4");
}

setTimeout(() => {
  console.log("5");
}, 0);

async1();

new Promise((resolve) => {
  console.log("6");
  resolve();
}).then(() => {
  console.log("7");
});

console.log("8");

/*

❌ MY OUTPUT:
1 2 6 8 3 7 5

✅ CORRECT OUTPUT:
1 2 4 6 8 3 7 5

❌ MISTAKE:

I assumed:

await async2()
=> async2 later chalega

BUT REALITY:

async2() executes IMMEDIATELY

Only THIS part becomes async:

console.log("3")

📘 INTERNAL FLOW:

await async2()

Step 1:
async2() runs NOW
→ prints 4

Step 2:
await pauses remaining code

Step 3:
console.log("3")
goes to microtask queue

📘 BIGGEST LEARNING:

❌ await delays function execution
✅ await delays NEXT lines only

*/