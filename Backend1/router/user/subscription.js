const { paymentCheckOut } = require("../../controller/paymentCheckOut");
const {
  subscriptionDetail,
  getCustomerDetail,
  getStaterPlandetail,
  deleteStarterPlan,
  updateStarterPlan,
} = require("../../controller/subscriptionControll");
const IsLoggedIn = require("../../middleware/IsLoggedIn");
const router = require("express").Router();
const express = require("express");

router.post("/create-subscription", IsLoggedIn, subscriptionDetail);
router.get("/getstarterplandetail", IsLoggedIn, getStaterPlandetail)


module.exports = router;
