const express=require('express')
const User =require('../models/User')
const router=new express.Router()


//Signup
router.post('/signup',async (req,res)=>{
  const user =new User(req.body)
  try {
    await user.save();
  //  const token =await user.generateAuthToken();
    res.status(201).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})


//Login
router.post('/login',async (req,res)=>{
  try {
    const user =await User.findByCredentials(req.body.username,req.body.password)
    //generating tokens
    //  const token = await user.generateAuthToken()
    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = router
