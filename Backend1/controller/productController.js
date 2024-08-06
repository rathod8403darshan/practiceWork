const product = require("../models/productModel");
const User = require("../models/userModel");

const getAllProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const getData = await product.find();
      res
        .status(200)
        .json({ message: "Get admin all product Success", data: getData });
    } else {
      const getData = await product.find({ createdBy: req.user.id });
      res
        .status(200)
        .json({ message: "Get single user product Success", data: getData,isSuccess:true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, detail, discount, bgcolor } = req.body;
    const file = req.file
    let filePath = `http://localhost:7000/uploads/${file?.originalname}`;
    
    const newProduct = await product.create({
      name,
      price,
      detail,
      discount,
      bgcolor,
      image: filePath,
      createdBy: req.user.id,
    });

    res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct ,isSuccess:true});
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};

const updateProduct = async (req, res) => {
  try {

    const file = req.file
    let filePath = file ?  `http://localhost:7000/uploads/${file?.originalname}` : req.body.image

    const newProduct = await product.findOneAndUpdate({_id:req.params.id},{$set:req.body,image:filePath},{new:true});

    res
      .status(200)
      .json({ message: "Product update successfully", data: newProduct,isSuccess:true});
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const newProduct = await product.findOneAndDelete({_id:req.params.id});
    res
      .status(200)
      .json({ message: "Product deleted successfully", data: newProduct,isSuccess:true });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
