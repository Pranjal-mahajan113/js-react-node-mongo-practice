// ============================================================================
// ⚡ ADVANCED EVENT LOOP + PROMISE CHAINING — 18 MAY 2026
// ============================================================================



// 🟦 Q1 ======================================================================

console.log("start");

Promise.resolve()
  .then(() => {
    console.log("then1");
  })
  .finally(() => {
    console.log("finally");
  })
  .then(() => {
    console.log("then2");
  });

console.log("end");

/*

❌ MY OUTPUT:
start
end
finally
then1
then2

✅ CORRECT OUTPUT:
start
end
then1
finally
then2

❌ MISTAKE:

I thought:
finally() executes immediately

❌ Wrong.

.finally() waits for
previous chain step completion.

Flow:

Sync:
start
end

Microtasks:

then1
→ finally
→ then2

📘 LEARNED:

✔ finally() is also part
of Promise chain

✔ It executes AFTER
previous .then()

*/



// 🟦 Q2 ======================================================================

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3");
    return Promise.resolve();
  })
  .then(() => {
    console.log("4");
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

When 3 finishes:
→ next .then(4)
added later

Updated Queue:
[5, 4]

✔ Promise chaining creates
new future microtasks

*/



// 🟦 Q3 ======================================================================

console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

}, 0);

Promise.resolve().then(() => {
  console.log("D");

  setTimeout(() => {
    console.log("E");
  }, 0);

  queueMicrotask(() => {
    console.log("F");
  });
});

console.log("G");

/*

✅ OUTPUT:
A
G
D
F
B
C
E

✔ Correct

📘 LEARNED:

Inside microtask:

queueMicrotask(F)
gets priority before timers.

Timers Queue:
[B, E]

B registered first
→ executes first

After B macrotask:
microtask C runs

✔ After each macrotask:
drain microtasks again

*/



// 🟦 Q4 ======================================================================

console.log("1");

async function foo() {
  console.log("2");

  await Promise.resolve();

  console.log("3");

  Promise.resolve().then(() => {
    console.log("4");
  });

  console.log("5");
}

foo();

Promise.resolve().then(() => {
  console.log("6");
});

console.log("7");

/*

❌ MY OUTPUT:
1
2
5
7
3
4
6

✅ CORRECT OUTPUT:
1
2
7
3
5
6
4

❌ MISTAKE:

I thought:
after await,
entire remaining code executes immediately

❌ Wrong.

Flow:

Sync:
1
2
7

Initial Microtask Queue:
[foo continuation, 6]

foo continuation:
3

Promise.then(4)
→ queued later

5

Updated Queue:
[6, 4]

Then:
6
4

📘 LEARNED:

✔ Promise.then() inside async continuation
creates NEW microtask

✔ New microtasks go
to END of queue

*/



// 🟦 Q5 ======================================================================

console.log("A");

setTimeout(() => {
  console.log("B");

  queueMicrotask(() => {
    console.log("C");
  });

}, 0);

queueMicrotask(() => {
  console.log("D");

  setTimeout(() => {
    console.log("E");
  }, 0);
});

Promise.resolve().then(() => {
  console.log("F");
});

console.log("G");

/*

✅ OUTPUT:
A
G
D
F
B
C
E

✔ Correct

📘 LEARNED:

Initial Microtask Queue:
[D, F]

During D:
timer E registered

Timers Queue:
[B, E]

After B:
microtask C runs

THEN:
E

✔ queueMicrotask behaves
same priority as Promise.then()

*/



// 🟦 Q6 ======================================================================

console.log("1");

Promise.resolve().then(() => {
  console.log("2");

  return Promise.resolve().then(() => {
    console.log("3");
  });
}).then(() => {
  console.log("4");
});

Promise.resolve().then(() => {
  console.log("5");
});

console.log("6");

/*

❌ MY OUTPUT:
1
6
2
3
4
5

✅ CORRECT OUTPUT:
1
6
2
5
3
4

❌ MISTAKE:

I thought:
3 and 4 execute before 5

❌ Wrong.

Flow:

Initial Microtask Queue:
[2-chain, 5]

2 executes

returns:
Promise.resolve().then(3)

Now:
5 already waiting

Queue:
[5, 3]

Then:
4 added later

Updated Queue:
[3, 4]

📘 LEARNED:

✔ Returned Promise delays
next .then()

✔ Existing microtasks execute first

*/



// 🟦 Q7 ======================================================================

console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

(async () => {
  console.log("async start");

  await Promise.resolve();

  console.log("async middle");

  await Promise.resolve();

  console.log("async end");
})();

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

/*

✅ OUTPUT:
start
async start
end
async middle
promise
async end
timeout

✔ Correct

📘 LEARNED:

Initial Microtask Queue:
[async middle continuation, promise]

During async middle:
second await pauses again

Queue becomes:
[promise, async end]

✔ Every await creates
new continuation microtask

*/



// 🟦 Q8 ======================================================================

console.log("A");

Promise.resolve().then(() => {
  console.log("B");

  queueMicrotask(() => {
    console.log("C");
  });

  Promise.resolve().then(() => {
    console.log("D");
  });
});

queueMicrotask(() => {
  console.log("E");
});

console.log("F");

/*

❌ MY OUTPUT:
A
F
B
E
C
D

✅ CORRECT OUTPUT:
A
F
B
E
C
D

✔ Correct

📘 LEARNED:

Initial Microtask Queue:
[B, E]

During B:
→ add C
→ add D

Updated Queue:
[E, C, D]

✔ queueMicrotask()
and Promise.then()
share SAME microtask queue

✔ insertion timing matters

*/