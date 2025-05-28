const express = require("express");
const {handleSignup, handleLogin,handleSubscription, checkSubscription } = require("../controllers/authorization.controller")
const router = express.Router();


router.post("/signup",handleSignup)
router.post("/login",handleLogin)
router.post("/subscribe",handleSubscription)
router.get("/check-subscription",checkSubscription)
module.exports = router;