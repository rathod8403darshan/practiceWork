const { getUserData, addUser, deleteUser, updateUser, loginUser, findLoginuser, resetPassword } = require("../../controller/getUserController")

const router = require("express").Router()
const multer  = require('multer')
const IsLoggedIn = require("../../middleware/IsLoggedIn")

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


  router.post("/adduser",upload.single('file'),addUser)
  router.post("/loginuser",loginUser)
  router.get("/getuser",getUserData)
router.delete("/deleteuser/:id",IsLoggedIn,deleteUser)
router.patch("/updateuser/:id",IsLoggedIn,upload.single('file'),updateUser)
router.get("/findLoginuser",IsLoggedIn,findLoginuser)
router.post("/resetpassword",IsLoggedIn,resetPassword)


module.exports= router