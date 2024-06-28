const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
mongoose.connect(`${process.env.MONGODB_URL}/socialmedia`, { useNewUrlParser: true, useUnifiedTopology: true });
// , { useNewUrlParser: true, useUnifiedTopology: true }

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      trim:true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true ,
        trim:true
    },
    password: { 
        type: String, 
        required: true 
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Post'
        }
    ]
  },
  { timestamps: true }
);

//middleware access
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(7);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
         {
             _id: this._id,
             username: this.username,
             email: this.email,
         },//payload variables and values are coming from database
         process.env.ACCESS_TOKEN_SECRET,
         {
             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
         }
     )
 }

const User = mongoose.model("User",userSchema)
module.exports = User;