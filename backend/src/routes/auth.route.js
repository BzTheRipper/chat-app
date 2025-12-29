const express = require("express");


///////////////////////////////
const router = express.Router();
//////////////////////////////


const {signup, login, logout, updateProfile, checkAuth} = require("../controllers/auth.controller.js");
const protectRoute = require("../middleware/auth.middleware.js");



router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update_profile", protectRoute, updateProfile);

router.get("/checkAuth", protectRoute, checkAuth);

module.exports = router;