const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: "unknown_avatar.png"
    }
    // tokens: [{
    //     token: {
    //       type: String,
    //       required: true
    //     }
    //   }]
  },
  { timestamps: true }
);

//Checking user credentials and returning them
userSchema.statics.findByCredentials = async (username,password)=>{
  const user = await User.findOne({username})
  if(!user)
  throw new Error('Invalid credentials')

  const validated=await bcrypt.compare(password,user.password)
  if(!validated)
  throw new Error('Invalid credentials!')
  return user
}

//generating tokens
// userSchema.methods.generateAuthToken = async function() {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "MySecretTxt");
//   user.tokens = user.tokens.concat({token})
//   await user.save()
//   return token;
// };

// Hashing plain text password before saving it
userSchema.pre('save', async function(next){
  const user = this
  if(user.isModified('password'))
  {
    const salt =await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
  }
  next()    //to call next  middleware (in this case save) by saying we are done with current middleware(pre)
})

//Hiding hidden data from user
userSchema.methods.toJSON = function (){
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}

//Creating User model
const User = mongoose.model("User", userSchema);
module.exports = User;
