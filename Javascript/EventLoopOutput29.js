// ============================================================================
// ⚡ NODE.JS + ASYNC/AWAIT REVISION — 29 MAY 2026
// ============================================================================



// 🟦 Q1 ======================================================================

console.log("A");

process.nextTick(() => {
  console.log("B");
});

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");

/*

✅ MY ANSWER:
A D B C

✔ CORRECT

📘 LEARNED:

Node.js Microtask Priority:

1. process.nextTick()
2. Promise.then()

Flow:

Sync:
A
D

nextTick:
B

Promise:
C

📘 IMPORTANT:

✔ nextTick has HIGHER priority
than Promise microtasks

*/



// 🟦 Q2 ======================================================================

console.log("1");

Promise.resolve().then(() => {
  console.log("2");

  process.nextTick(() => {
    console.log("3");
  });
});

Promise.resolve().then(() => {
  console.log("4");
});

console.log("5");

/*

✅ MY ANSWER:
1 5 2 4 3

✔ CORRECT

📘 LEARNED:

Initial Promise Queue:
[2, 4]

2 executes first

Inside 2:
nextTick(3) added

BUT:
current Promise queue finishes first

So:
4 executes

THEN:
3

📘 IMPORTANT:

✔ process.nextTick added INSIDE Promise
does NOT interrupt current Promise queue

✔ It runs after current microtask drain cycle

*/



// 🟦 Q3 ======================================================================

console.log("start");

async function foo() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

foo();

console.log("end");

/*

✅ MY ANSWER:
start A end B

✔ CORRECT

📘 LEARNED:

Async functions execute synchronously
UNTIL first await.

Flow:

Sync:
start
A
end

Microtask:
B

📘 IMPORTANT:

✔ await pauses remaining function
✔ continuation becomes microtask

*/



// 🟦 Q4 ======================================================================

console.log("1");

setTimeout(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });

}, 0);

process.nextTick(() => {
  console.log("4");
});

console.log("5");

/*

✅ MY ANSWER:
1 5 4 2 3

✔ CORRECT

📘 LEARNED:

Priority Order:

1. Sync
2. nextTick
3. timers
4. Promise microtasks created inside timer

Flow:

Sync:
1
5

nextTick:
4

Timer:
2

Inside timer:
Promise.then → 3

📘 IMPORTANT:

✔ After every macrotask,
Node drains microtasks again

*/



// ============================================================================
// 🏆 STATUS — 29 MAY 2026
// ============================================================================

/*

🔥 BIG IMPROVEMENT

Now correctly understand:

✔ process.nextTick priority
✔ Promise microtasks
✔ async/await continuation
✔ timer → microtask draining
✔ queue ordering
✔ nested scheduling

📘 MOST IMPORTANT THING YOU FIXED:

❌ "async means whole function delayed"
✅ "only code AFTER await delayed"

❌ "new microtask executes immediately"
✅ "it joins END of current queue"



✔ queues
✔ phases
✔ insertion timing



🚀 HUGE progress.

*/