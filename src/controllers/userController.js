const bcrypt = require("bcryptjs");
const users = require("../models/users");

// To get all created users
const getUser = async (req, res) => {
  const allUsers = await users.find({});
  try {
    res.json({ status: "Ok", data: allUsers });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// creating new users
const signup = async (req, res) => {
  const email = req.body.email;
  try {
    let user = await users.findOne({ email });
    if (user) return res.json({ status: false, msg: "email already exists" });

    if (req.body.password !== req.body.confirmPassword) {
      return res.json({ status: false, msg: "password does not match" });
    }

    const password = await bcrypt.hash(req.body.password, 12);

    const newUser = { ...req.body, password };
    user = new users(newUser);
    await user.save();
    res.status(200).json({ msg: `User successfully created`, data: user });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

// login for already created users
const signIn = async (req, res) => {};

module.exports = { signup, signIn, getUser };
