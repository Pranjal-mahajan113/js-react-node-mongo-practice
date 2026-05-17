// ============================================================================
// ⚡ EVENT LOOP + MICROTASK PRACTICE — 17 MAY 2026
// ============================================================================



// 🟦 Q1 ======================================================================

console.log("start");

async function foo() {
  console.log("foo start");

  await Promise.resolve();

  console.log("foo middle");

  await Promise.resolve();

  console.log("foo end");
}

foo();

console.log("outside");

/*

❌ MY OUTPUT:
start
outside
foo start
foo middle
foo end

✅ CORRECT OUTPUT:
start
foo start
outside
foo middle
foo end

❌ MISTAKE:

I thought:
entire async function becomes async

❌ Wrong.

Async functions execute synchronously
UNTIL first await.

Flow:

start

foo():
→ foo start

await Promise.resolve()
→ pause remaining code

outside

Microtask:
foo middle

Second await:
pause again

Next Microtask:
foo end

📘 LEARNED:

✔ async function starts synchronously
✔ only code AFTER await becomes async

*/



// 🟦 Q2 ======================================================================

console.log("1");

Promise.resolve()
  .then(() => {
    console.log("2");
  })
  .then(() => {
    console.log("3");
  });

Promise.resolve().then(() => {
  console.log("4");
});

console.log("5");

/*

✅ OUTPUT:
1
5
2
4
3

✔ Correct

📘 LEARNED:

Initial Microtask Queue:
[2, 4]

When 2 executes:
THEN next .then(3)
gets added

Updated Queue:
[4, 3]

✔ Promise chaining adds new microtasks later

✔ FIFO still applies

*/



// 🟦 Q3 ======================================================================

console.log("A");

queueMicrotask(() => {
  console.log("B");
});

Promise.resolve().then(() => {
  console.log("C");
});

setTimeout(() => {
  console.log("D");
}, 0);

console.log("E");

/*

✅ OUTPUT:
A
E
B
C
D

✔ Correct

📘 LEARNED:

queueMicrotask()
and Promise.then()

BOTH go to:
✔ Microtask Queue

Order depends on:
✔ insertion timing

Queue:

[B, C]

Macrotask:
[D]

*/



// 🟦 Q4 ======================================================================

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

queueMicrotask(() => {
  console.log("3");

  queueMicrotask(() => {
    console.log("4");
  });
});

Promise.resolve().then(() => {
  console.log("5");
});

console.log("6");

/*

✅ OUTPUT:
1
6
3
5
4
2

✔ Correct

📘 LEARNED:

Initial Microtask Queue:
[3, 5]

When 3 executes:
→ adds 4

Updated Queue:
[5, 4]

✔ Nested microtasks go
to END of queue

✔ FIFO maintained

*/



// 🟦 Q5 ======================================================================

console.log("start");

async function test() {
  console.log("A");

  await null;

  console.log("B");

  await null;

  console.log("C");
}

test();

Promise.resolve().then(() => {
  console.log("D");
});

console.log("end");

/*

❌ MY OUTPUT:
start
A
end
B
C
D

✅ CORRECT OUTPUT:
start
A
end
B
D
C

❌ MISTAKE:

I thought:
after B,
C immediately executes

❌ Wrong.

Second await pauses again.

Flow:

Sync:
start
A
end

Microtask Queue:
[B continuation, D]

B executes

Second await:
→ pauses again
→ C added later

Updated Queue:
[D, C]

📘 LEARNED:

Every await creates
NEW microtask continuation.

✔ await splits execution

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

  queueMicrotask(() => {
    console.log("5");
  });
});

console.log("6");

/*

✅ OUTPUT:
1
6
4
5
2
3

✔ Correct

📘 LEARNED:

queueMicrotask()
inside microtask

gets added immediately
to END of current microtask queue.

Flow:

Initial Microtask Queue:
[4]

During 4:
→ add 5

Queue:
[5]

After all microtasks:
→ macrotask 2

Then:
microtask 3

✔ After every macrotask:
drain microtasks again

*/



// 🟦 Q7 ======================================================================

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

(async function () {
  console.log("C");

  await Promise.resolve();

  console.log("D");

  await Promise.resolve();

  console.log("E");
})();

Promise.resolve().then(() => {
  console.log("F");
});

console.log("G");

/*

✅ OUTPUT:
A
C
G
D
F
E
B

✔ Correct

📘 LEARNED:

Initial sync:
A
C
G

Initial Microtask Queue:
[D continuation, F]

When D executes:
Second await pauses again

Queue becomes:
[F, E]

Then:
B macrotask

✔ await continuations
are normal microtasks

*/



// 🟦 Q8 ======================================================================

console.log("1");

Promise.resolve().then(() => {
  console.log("2");

  setTimeout(() => {
    console.log("3");
  }, 0);

  return Promise.resolve();
}).then(() => {
  console.log("4");
});

setTimeout(() => {
  console.log("5");
}, 0);

console.log("6");

/*

✅ OUTPUT:
1
6
2
4
5
3

✔ Correct

📘 LEARNED:

When first .then() resolves:

2 executes
→ timer 3 registered
→ returns resolved promise

THEN:
next .then(4)
enters microtask queue

Timers Queue:

[5, 3]

Because:
5 registered earlier

✔ FIFO still applies
for macrotasks

📘 IMPORTANT:

Promise chain continuation
has higher priority
than setTimeout.

*/