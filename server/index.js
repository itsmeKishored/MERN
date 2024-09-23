const express = require('express')
const mongoose = require('mongoose')
const User = require('./model/user')
const cors =require('cors')
const PORT = 3456
const app=express()
app.use(express.json());
app.use(cors())
mongoose.connect('mongodb://localhost:27017/homeworkRegister').then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log(err)
})



// Register User
app.post('/register', (req, res) => {
    User.create(req.body)
      .then((result) => {
        res.json(result)
      })
      .catch((e) => {
        console.log(e)
        res.status(500).json({ error: 'Failed to register user' })
      })
  })
  
  // Fetch all users
  app.get('/users', (req, res) => {
    User.find()
      .then((users) => {
        res.json(users)
      })
      .catch((e) => {
        console.log(e)
        res.status(500).json({ error: 'Failed to fetch users' })
      })
  })
  
app.listen(PORT,(e)=>{
    if(e) {
        console.log(e);
    }
    if (!e){
        console.log("Server started successfully")
    }
})
