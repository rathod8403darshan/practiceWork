const { paymentCheckOut } = require("../../controller/paymentCheckOut")
const IsLoggedIn = require("../../middleware/IsLoggedIn")

const router = require("express").Router()
  router.post("/paymentCheckOut",IsLoggedIn,paymentCheckOut)


module.exports= router