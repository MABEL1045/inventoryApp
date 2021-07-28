const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    min: [5, 'Too short, min is 5 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    },
    password: {
    type: String,
    min: [5, 'Too short, min is 5 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required'
    },
});

module.exports = mongoose.model("User", userSchema);
