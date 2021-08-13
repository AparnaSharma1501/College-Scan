const express=require('express')
const router=new express.Router()
const Category=require('../models/Category')

//Create category
router.post('/',async(req,res)=>{
  const cat =new Category(req.body)
  try {
    await cat.save()
    res.send(cat)
  } catch (e) {
    res.status(500).send(e)
  }
})

//get categories
router.get('/',async(req,res)=>{
  try {
    const cats =await Category.find()
    res.send(cats)
  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router
