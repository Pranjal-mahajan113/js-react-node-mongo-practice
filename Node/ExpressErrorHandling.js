import express from "express";
const app = express();

app.get("/data", (req, res, next) => {
  console.log("A");
  next(new Error("Something went wrong!"));
});

app.get("/data", (req, res, next) => {
  console.log("B");
  res.send("Data route");
});

app.use((req, res, next) => {
  console.log("C");
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.log("D");
  res.status(500).send(err.message);
});

app.listen(3000);


// ✅ Complete Answer:
// Logs:
// A        ← normal route chala
// D        ← directly error handler pe gaya
// B → Never prints ❌ — normal route skip
// C → Never prints ❌ — 404 handler skip
// Client receives → "Something went wrong!" with status 500

// 🔑 Key Concepts:
// ConceptRulenext()Agla normal middlewarenext(error)Seedha error handler pe jumpError handler4 arguments — (err, req, res, next)Normal middleware3 arguments — (req, res, next)C skip kyu404 handler sirf unknown routes ke liye

// ⚠️ Important Interview Point:
// javascript// Express error handler ALWAYS 4 arguments!
// // Agar 3 likhe toh Express treat karega normal middleware
// app.use((err, req, res, next) => {  // ✅ Error handler
// app.use((req, res, next) => {       // ❌ Normal middleware