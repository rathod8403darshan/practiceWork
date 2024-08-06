const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: String,
  price: Number,
  detail: String,
  discount: String,
  bgcolor: String,
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{timestamps:true});
const product = mongoose.model("product", Product);

module.exports = product;
