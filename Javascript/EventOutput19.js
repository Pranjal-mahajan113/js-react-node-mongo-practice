// ============================================================================
// ⚡ NODE.JS EVENT LOOP (NEXTTICK + PROMISE + TIMER + IMMEDIATE)
// — 19 MAY 2026 PRACTICE
// ============================================================================



// 🟦 Q1 ======================================================================

console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

/*
📘 CORRECT ORDER (Node.js rules):

Sync:
start
end

MICROTASK PRIORITY (Node):

1. process.nextTick queue (HIGHEST)
2. Promise microtasks

So:
nextTick
promise

Then event loop phases:

timers → setTimeout
check → setImmediate

📘 FINAL OUTPUT:
start
end
nextTick
promise
timeout / immediate (order NOT guaranteed always)

⚠ IMPORTANT:
setTimeout vs setImmediate order is NOT deterministic
outside I/O context

*/



// 🟦 Q2 ======================================================================

console.log("1");

setTimeout(() => {
  console.log("2");

  process.nextTick(() => {
    console.log("3");
  });

  Promise.resolve().then(() => {
    console.log("4");
  });

}, 0);

setImmediate(() => {
  console.log("5");
});

console.log("6");

/*

✅ MY OUTPUT:
1,6,5,2,3,4

📘 CORRECT NODE BEHAVIOR:

Sync:
1
6

Microtasks:
(none yet)

Event loop:

timers:
2

Inside 2:
nextTick queue → 3
promise microtask → 4

check phase:
5

📘 FINAL OUTPUT:
1
6
2
3
4
5

📘 LEARNED:
✔ nextTick always overrides Promise
✔ inside timer → nextTick runs first

*/



// 🟦 Q3 ======================================================================

console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

process.nextTick(() => {
  console.log("C");

  process.nextTick(() => {
    console.log("D");
  });
});

console.log("E");

/*

✅ MY OUTPUT:
A E C D B

✔ CORRECT OUTPUT:
A E C D B

📘 LEARNED:

Priority order:

process.nextTick → runs FIRST
then Promise microtasks

Queue:

nextTick: C → D
Promise: B

✔ nextTick recursion stays first priority

*/



// 🟦 Q4 ======================================================================

console.log("start");

setTimeout(() => {
  console.log("timeout1");

  setImmediate(() => {
    console.log("immediate1");
  });

}, 0);

setImmediate(() => {
  console.log("immediate2");

  setTimeout(() => {
    console.log("timeout2");
  }, 0);
});

console.log("end");

/*

❌ YOUR OUTPUT:
start end timeout1 immediate1 immediate2 timeout2

❌ MISTAKE:

You assumed fixed order between:
setTimeout and setImmediate

📘 CORRECT CONCEPT:

These two are NOT deterministic
unless inside I/O cycle.

Typical flow:

start
end

timers phase:
timeout1

check phase:
immediate2

then:
immediate1
timeout2 (timing dependent)

📘 LEARNED:
✔ setTimeout vs setImmediate is race
✔ order depends on event loop phase timing

*/



// 🟦 Q5 ======================================================================

console.log("1");

process.nextTick(() => {
  console.log("2");
});

Promise.resolve().then(() => {
  console.log("3");

  process.nextTick(() => {
    console.log("4");
  });
});

setImmediate(() => {
  console.log("5");
});

console.log("6");

/*

❌ YOUR OUTPUT:
1 6 2 5 3 4

✔ CORRECT OUTPUT:
1 6 2 3 4 5

📘 MISTAKE:

You thought:
setImmediate runs before Promise microtasks

❌ WRONG ORDER (Node priority):

1. sync
2. nextTick queue
3. Promise microtasks
4. timers
5. check (setImmediate)

📘 FINAL FLOW:

Sync:
1 6

nextTick:
2

Promise:
3 → schedules 4

then immediate:
5

📘 LEARNED:
✔ nextTick > Promise > setImmediate

*/



// 🟦 Q6 ======================================================================

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

setImmediate(() => {
  console.log("C");

  Promise.resolve().then(() => {
    console.log("D");
  });

  process.nextTick(() => {
    console.log("E");
  });
});

process.nextTick(() => {
  console.log("F");
});

console.log("G");

/*

❌ YOUR OUTPUT:
A G F C D E B

❌ MISTAKE:

Wrong internal ordering inside setImmediate block

📘 CORRECT FLOW:

Sync:
A G

nextTick:
F

timers:
B

check:
C

Inside C:
nextTick → E (highest)
Promise → D

📘 FINAL OUTPUT:
A
G
F
B
C
E
D

📘 LEARNED:
✔ nextTick inside phase still runs FIRST
✔ Promise runs after nextTick
✔ phases matter more than intuition

*/



// 🟦 Q7 ======================================================================

console.log("1");

setImmediate(() => {
  console.log("2");

  setTimeout(() => {
    console.log("3");
  }, 0);

  process.nextTick(() => {
    console.log("4");
  });

});

Promise.resolve().then(() => {
  console.log("5");
});

process.nextTick(() => {
  console.log("6");
});

console.log("7");

/*

❌ YOUR OUTPUT:
1 7 6 5 4 2 3

❌ MISTAKE:

You assumed immediate runs early

📘 CORRECT ORDER:

Sync:
1 7

nextTick:
6

Promise:
5

check phase:
2

Inside 2:
nextTick → 4
timer → 3

📘 FINAL OUTPUT:
1
7
6
5
2
4
3

📘 LEARNED:
✔ setImmediate runs AFTER microtasks
✔ inside immediate → nextTick dominates again

*/