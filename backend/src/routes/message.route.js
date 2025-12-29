const express = require("express");
const protectRoute = require("../middleware/auth.middleware.js");
const {getUsersForSideBar, getMessages} = require("../controllers/message.controller.js");

///////////////////////////////
const router = express.Router();
//////////////////////////////


router.get("/users", protectRoute, getUsersForSideBar);
router.get("/:id", protectRoute, getMessages);

module.exports = router;