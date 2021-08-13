const express = require('express')
require('./src/db/mongoose')
const authRouter=require('./src/routes/auth')
const userRouter=require('./src/routes/users')
const postRouter=require('./src/routes/posts')
const catRouter=require('./src/routes/categories')
const multer=require('multer')
const path=require('path')

const app=express()

const port =process.env.PORT ||3000
//configuring express to automaticaaly get json parsed to object
app.use(express.json())

//making images folder public
app.use("/images",express.static(path.join(__dirname,"/images")))



//For pics uploading
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images");
  },filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
})

//how to upload the file
const upload=multer({storage:storage})
app.post('/api/upload',upload.single("file"),(req,res)=>{
  res.status(200).send("File has been uploaded.")
})

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/categories",catRouter)




app.listen(port,()=>{
  console.log('My server is up and running on port '+port);
})
