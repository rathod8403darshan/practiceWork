const { getAllCart, createCart, removeCart, updateCartItem } = require("../../controller/cartController")
const { paymentCheckOut } = require("../../controller/paymentCheckOut")
const IsLoggedIn = require("../../middleware/IsLoggedIn")

const router = require("express").Router()


  router.get("/getCart",IsLoggedIn,getAllCart)
  router.post("/addCart",IsLoggedIn,createCart)
  router.delete("/removeCart/:id",IsLoggedIn,removeCart)
  router.patch("/updateCart/:id",IsLoggedIn,updateCartItem)


module.exports= router