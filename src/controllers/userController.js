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
const signIn = async (req, res) => {};

module.exports = { signup, signIn, getUser };
