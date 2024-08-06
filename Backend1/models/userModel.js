const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phoneno: Number,
  city: String,
  country: String,
  state: String,
  isAdmin: Boolean,
  file:String,
  setgender:String,
  dateOfBirth:String,
},{timestamps:true});
const User = mongoose.model("User", userSchema);


module.exports = User