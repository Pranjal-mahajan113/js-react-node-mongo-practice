const user1 = {
  name: "Pranjal"
};

const user2 = user1;

user2.name = "Rahul";

console.log(user1.name);
console.log(user2.name);

// Suppose DB se user object aaya:

const user = {
  name: "Pranjal",
  email: "a@gmail.com",
  password: "123456"
}