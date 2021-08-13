const express=require('express')
const router=new express.Router()
const Post=require('../models/Post')

//Create Post
router.post('/',async (req,res)=>{
  const post=new Post(req.body)
  try {
    await post.save()
    res.send(post)
  } catch (e) {
    res.status(500).send(e)
  }
})

//get post
router.get('/:id',async (req,res)=>{
  try {
    const post =await Post.findById(req.params.id)
    res.send(post)
  } catch (e) {
    res.status(500).send(e)
  }
})

//Get all posts
router.get('/',async (req,res)=>{
  const username = req.query.user
    const catName = req.query.cat
  try {
    let posts
    if(username)
    posts=await Post.find({username})
    else if(catName)
    posts=await Post.find({categories:{
      $in:[catName]
    }})
    else
    posts = await Post.find()

    res.send(posts)
  } catch (e) {
    res.status(500).send(e)
  }
})

//Update Post
router.patch('/:id',async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id)
    if(post.username===req.body.username)
    {
      const updates= Object.keys(req.body)
      updates.shift()
      const allowedUpdates=["title","desc","photo"]
      const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update))
      if(!isValidUpdate)
      return res.status(404).send({error:"Invalid Updates"})

       updates.forEach((update)=>post[update] = req.body[update])  //user.name = "Someone's name" but we here updtaing dynamically using [] syntax
       await post.save()
       res.send(post)
    }else{
      res.status(401).send("You can update only your post.")
    }

  } catch (e) {
    res.status(500).send(e)
  }
})

//delete post
router.delete('/:id',async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id)
    if(post.username===req.body.username)
    {
       await post.delete()
       res.send("Post has been deleted.")
    }else{
      res.status(401).send("You can delete only your post.")
    }

  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router
