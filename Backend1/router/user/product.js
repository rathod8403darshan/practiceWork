const router = require("express").Router()
const multer  = require('multer')
const IsLoggedIn = require("../../middleware/IsLoggedIn")
const { getAllProduct, createProduct, updateProduct, deleteProduct } = require("../../controller/productController")

const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      req.body.file = file.originalname
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


router.get("/allproduct",IsLoggedIn,getAllProduct)
router.post("/addproduct",upload.single("image"),IsLoggedIn,createProduct)
router.delete("/deleteproduct/:id",IsLoggedIn,deleteProduct)
router.patch("/updateproduct/:id",upload.single("image"),IsLoggedIn,updateProduct)


module.exports= router