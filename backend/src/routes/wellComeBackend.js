const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Congrats You Are In The Backend Now");
    res.send("<h1 align = 'center'> Wellcome To The Backend </h1>");
});

module.exports = router;