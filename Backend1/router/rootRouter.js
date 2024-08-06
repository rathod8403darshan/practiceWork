const router = require("express").Router()
const user = require("./user/user");
const product = require('./user/product')
const payment = require('./user/payment')
const cart = require('./user/cart')
const subscription = require('./user/subscription')




router.use("/user",user)
router.use("/product",product)
router.use("/payment",payment)
router.use("/cart",cart)
router.use("/subscription",subscription)


module.exports= router