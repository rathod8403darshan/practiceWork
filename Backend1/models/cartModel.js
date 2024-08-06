const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  product_id:String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  quantity: { type: Number, default: 1, min: 1 } 
},{timestamps:true});
const Cart1 = mongoose.model("cart", Cart);

module.exports = Cart1;
