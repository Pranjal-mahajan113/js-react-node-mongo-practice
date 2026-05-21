async function first() {
  console.log("A");
  await second();
  console.log("B");
}

async function second() {
  console.log("C");
  await Promise.resolve();
  console.log("D");
}

console.log("E");
first();
console.log("F");

//E,A,C,F,D,B

// 1. E    → sync
// 2. first() call →
// 3. A    → sync inside first
// 4. await second() → second() call →
// 5. C    → sync inside second
// 6. await Promise.resolve() → D microtask mein
// 7. F    → sync continues (first() paused)
// --- sync khatam ---
// 8. D    → microtask resolves
// 9. B    → second() khatam, first() continues