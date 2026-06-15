const express = require("express")


const app = express ()

const users =[];

app.post("/register",(req,res)=>{
  const {name,email,password} = req.body;

  const user = {
    name,
    email,
    password,
  };
  Users.push(user);
  res.status(201).json({
    message:"User registered successfully"
  })
})

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("API is working")
})