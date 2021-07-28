const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../models/users");

// To get all created users
const getUser = async (req, res) => {
  try {
  const allUsers = await User.find({});
    res.json({ status: "Ok", data: allUsers });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// creating new users
const signup = async(req, res, next) => {
  try {
  let { firstName, lastName, email, password} = req.body
  // validation
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
      return res.json({
          status: "failed",
          msg: "email already exist"
      })
  }

  // password hashing
  password = await bcrypt.hash(password, 12);

  const newUser = {firstName, lastName, email, password}
  const createUser = await User.create(newUser);
  console.log(createUser)
  
  const id = createUser._id;
  const token = jwt.sign({id}, process.env.JWT_SECRET , {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`
  });


  res.status(201).json({status: "success", token,
   newUser: {
     id: createUser.id,
     firstName: createUser.firstName,
     lastName: createUser.lastName,
     email: createUser.email
   }
  });
  }
  catch(err) {
  
      res.status(400).json({status: "fail",
  err: err});
  console.log(err)
  }

next();
}

// login for already created users
const signIn = async (req, res) => {
  try {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({
          status: "failed",
          msg: "email does not exist"
      })
// verify user password
      const validPassword = await bcrypt.compare (req.body.password, User.password)
      if(!validPassword) return res.status(400).json({msg: "Incorrect password"})
      // generate token
      const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET)
      res.status(201).json({status: "success", token,
   msg: "You have successfully logged in",
   data: {
     id: user._id,
     firstName: user.firstName,
     lastName: user.lastName,
     email: user.email
   }
      });
    } catch(err) {
    console.log(err)
    res.json({err})
    }
  }

// Reset password
   const changePassword = async (req, res) => {
  try{
    const userId = req.user._id;
    if(userId !== req.params.id) {
      return res.status(400).json({success: false, msg: "Invalid id"})
    }
    const password = await bcrypt.hash(req.body.password, 12)
    const user = await User.findOneAndUpdate({_id: req.params.id}, {password: password}, {new:true});
    await user.save();
    return res.status(200).json({
      status: true, 
      msg: "Password successfully changed"
    })
  } catch(err) {
    console.log(err)
    return res.status(400).json({status: false, error: "error occured"})
  }
}


module.exports = { signup, signIn, changePassword, getUser };
