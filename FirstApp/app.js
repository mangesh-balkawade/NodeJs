const express = require("express");
const app = express();
const users=[{name:"Mangesh",age:20,mail:'man@gmail.com'},{name:"Shunham",age:22,mail:'subham@gmail.com'}]

app.get('/getUserData',(req,res)=>{
res.send(users)
console.log(users,"Data ");
})

app.listen(3000, (req,res) => {
  console.log("Server Starting on port 3000");
});



