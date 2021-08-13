const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:true
}).then(console.log('Connected to db')).catch(err=>console.log(err))
