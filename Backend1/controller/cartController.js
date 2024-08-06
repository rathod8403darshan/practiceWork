const Cart = require("../models/cartModel");
const product = require("../models/productModel");

const getAllCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ createdBy: req.user.id });
    const productIds = cartItems.map((item) => item.product_id);

    const products = await product.find({ _id: { $in: productIds } });

    const mergedData = cartItems.map(cartItem => {
      const productData = products.find(product => product._id.equals(cartItem.product_id));
      return {
          ...cartItem.toObject(),  
          product: productData  
      };
  });

  
  
    res
      .status(200)
      .json({ message: "Get all cart item Success", data: mergedData });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};

const createCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    if (!product_id) {
      return res.status(400).json({ message: "Product id is required" });
    }

    const exist = await Cart.findOne({ product_id });
    if (exist) {
      return res.status(400).json({ message: "Product already exists in cart" });
    }

    const newCart = await Cart.create({
      product_id,
      quantity,
      createdBy: req.user.id,
    });

    res.status(200).json({
      message: "Cart created successfully",
      data: newCart,
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};


    


const removeCart = async (req, res) => {
  try {
    const exist = await Cart.findOneAndDelete({ _id: req.params.id });
    if (!exist) {
      return res.json({ massage: "Product not exist in cart" });
    }
    res
      .status(200)
      .json({
        message: "Cart deleted successfully",
        data: exist,
        isSuccess: true,
      });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};

async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body;
    if (!quantity) {
      return res.json({ massage: "Quantity is required" });
    }

    const updatedCartItem = await Cart.findByIdAndUpdate(
      { _id: req.params.id },
      { quantity },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res
      .status(200)
      .json({
        message: "Cart item updated successfully",
        data: updatedCartItem,
      });
  } catch (error) {
    res.status(500).json({ error: "Error updating cart item" });
  }
}

module.exports = {
  getAllCart,
  createCart,
  removeCart,
  updateCartItem,
};
