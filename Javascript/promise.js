// function checksum(num) {
//   return new Promise((resolve, reject) => {
//     if (num > 10) {
//       resolve("Number is greater than 10");
//     } else {
//       reject("Number is 10 or less");
//     }
//   });
// }

// checksum(23)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// function isEven(num){
// return new Promise((resolve,reject) =>{
//     if(num%2===0){
//         resolve("Even Number")
//     }
//     else{
//         reject("Odd number")
//     }
// })

// }
// isEven(10)
// .then((result) =>{
//     console.log(result)
// })
// .catch((err)=>{
//     console.log(err)

// })

function checkPassword(password) {
  return new Promise((resolve, reject) => {
    if (password.length >= 8) {
      resolve("Password Accepted");
    } else {
      reject("Password short");
    }
  });
}
// checkPassword("14579ui")
// .then((result) =>{
//     console.log(result)
// })
// .catch((err)=>{
//     console.log(err)
// })

// async function validatePassword() {
//   try {
//     const result = await checkPassword("789uiope");
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// }
// validatePassword();


function processOrder(order) {
  return new Promise((resolve, reject) => {
    if (order && order.id) {
      resolve(order);
    } else {
      reject("Invalid Order ID");
    }
  });
}

processOrder({
  id: 101,
  product: "Laptop",
  quantity: 1,
})
  .then((order) => {
    console.log("Order Processed:", order);
  })
  .catch((error) => {
    console.log(error);
  });

  function getUserById(id) {
    return new Promise((resolve,reject) =>{
        

    })
  }