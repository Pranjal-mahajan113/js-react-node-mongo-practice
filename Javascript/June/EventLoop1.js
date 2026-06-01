// ============================================================================
// ⚡ NODE.JS ADVANCED REVISION
// — 1 JUNE 2026
// ============================================================================



// 🟦 Q1 ======================================================================

console.log("1");

Promise.resolve()
  .then(() => {
    console.log("2");

    return Promise.resolve()
      .then(() => {
        console.log("3");
      })
      .then(() => {
        console.log("4");
      });
  })
  .then(() => {
    console.log("5");
  });

console.log("6");

/*

✅ MY ANSWER:
1 6 2 3 4 5

✔ CORRECT

📘 FLOW:

Sync:
1
6

Microtask Queue:
[2]

2 executes

Returns Promise chain:

3
→ 4

Only AFTER returned Promise completes

5 enters queue

Final:

1
6
2
3
4
5

📘 LEARNED:

✔ Returning a Promise pauses
the outer chain

✔ Parent .then() waits for
returned Promise completion

Visual:

2
 └─> 3
      └─> 4
           └─> 5

*/



// 🟦 Q2 ======================================================================

console.log("A");

async function foo() {
  console.log("B");

  await Promise.resolve();

  console.log("C");

  await Promise.resolve();

  console.log("D");
}

Promise.resolve().then(() => {
  console.log("E");
});

foo();

console.log("F");

/*

✅ MY ANSWER:
A B F E C D

✔ CORRECT

📘 FLOW:

Sync:
A
B
F

Microtask Queue:

[E, C]

E executes

Then:
C

Second await:
adds D later

Queue:
[D]

Final:

A
B
F
E
C
D

📘 LEARNED:

✔ await continuation is just another microtask

✔ insertion timing decides order

*/



// 🟦 Q3 ======================================================================

console.log("1");

Promise.resolve().then(() => {
  console.log("2");

  process.nextTick(() => {
    console.log("3");
  });

  return Promise.resolve();
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
1 6 5 2 3 4

❌ NOT CORRECT

✅ CORRECT OUTPUT:
1
6
5
2
4
3

📘 WHY?

Sync:
1
6

nextTick:
5

Promise:
2

Inside 2:

nextTick(3) scheduled

return Promise.resolve()

This resolves immediately,
allowing next .then(4)
to be queued.

Current microtask queue:
[4]

4 executes

AFTER Promise queue drains:

nextTick queue:
3

Final:

1
6
5
2
4
3

📘 LEARNED:

⚠ process.nextTick created INSIDE
a Promise callback does NOT jump
ahead of already scheduled Promise jobs.

This is one of the trickiest Node.js questions.

*/



// 🟦 Q4 ======================================================================

const fs = require("fs");

console.log("start");

fs.readFile(__filename, () => {
  console.log("A");

  setImmediate(() => {
    console.log("B");
  });

  Promise.resolve().then(() => {
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

✅ MY ANSWER:
start
end
E
A
D
C
B

✔ CORRECT

📘 FLOW:

Sync:
start
end

Check phase:
E

Later I/O completes:

A

Inside I/O callback:

nextTick:
D

Promise:
C

check phase:
B

Final:

start
end
E
A
D
C
B

📘 LEARNED:

Inside I/O callback:

process.nextTick
>
Promise.then
>
setImmediate

Priority remains:

nextTick
→ Promise
→ check phase

*/




// ============================================================================
// 🏆 STATUS — 1 JUNE 2026
// ============================================================================

/*

🔥 BIG WIN



✔ Nested Promise chains
✔ Nested await continuations
✔ I/O callback ordering
✔ setImmediate inside I/O
✔ Promise queue insertion timing

The only miss today:

Q3

And it's one of the hardest Node.js
microtask questions because it mixes:

✔ Promise.then
✔ process.nextTick
✔ returned Promise chain

Current level:

Event Loop (Browser): ✅ Strong
Node.js Event Loop: ✅ Intermediate+
Promise Chains: ✅ Strong
I/O + Immediate: ✅ Good

*/