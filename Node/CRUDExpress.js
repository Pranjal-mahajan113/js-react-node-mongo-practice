const express = require("express");

const app = express();

app.use(express.json());

// Fake Database
let users = [
  { id: 1, name: "Rahul", age: 20 },
  { id: 2, name: "Amit", age: 22 },
];

// ==========================
// CREATE USER
// ==========================
app.post("/users", (req, res) => {
  users.push(req.body);

  res.status(201).json({
    message: "User created",
    users: users,
  });
});

// ==========================
// GET ALL USERS
// ==========================
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// ==========================
// GET SINGLE USER
// ==========================
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

// ==========================
// UPDATE USER
// ==========================
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        ...req.body,
      };
    }

    return user;
  });

  res.status(200).json({
    message: "User updated",
    users: users,
  });
});

// ==========================
// DELETE USER
// ==========================
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter((user) => user.id !== id);

  res.status(200).json({
    message: "User deleted",
    users: users,
  });
});

// ==========================
// SERVER
// ==========================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
