const express=require('express')
const router=new express.Router()
const User=require('../models/User')
const Post=require('../models/Post')

//get
router.get('/:id',async (req,res)=>{
  try {
    const user=await User.findById(req.params.id)
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

//update
router.patch('/:id',async (req,res)=>{

  if(req.body.userId===req.params.id)
  {
    const updates= Object.keys(req.body)
    updates.shift()
    const allowedUpdates=["username","email","password","profilePic"]
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidUpdate)
    return res.status(404).send({error:"Invalid Updates"})
     try {
      const user= await User.findById({_id:req.params.id})
      console.log(user)
      updates.forEach((update)=>user[update] = req.body[update])  //user.name = "Someone's name" but we here updtaing dynamically using [] syntax
      await user.save()
      res.send(user)
    } catch (e) {
      res.status(500).send(e)
    }
  }
  else{
    res.status(401).send("You can update only your account.")
  }
})

//delete
router.delete('/:id',async(req,res)=>{
  if(req.body.userId===req.params.id)
  {
    try {
      const user=await User.findById(req.params.id)
      try {
      await Post.deleteMany({username:user.username})
       await User.findByIdAndDelete(req.params.id)
       res.send("User has been deleted.")
     } catch (e) {
       res.status(500).send(e)
     }
    } catch (e) {
      res.status(404).send("User not found.")
    }
  }
  else{
    res.status(401).send("You can delete only your account.")
  }
})


module.exports = router
