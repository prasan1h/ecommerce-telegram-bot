
const express = require("express");
const router = express.Router();

const addOn = require("../controller/itemController.cjs");

router.post("/add", addOn);


module.exports = router;