
const router = require("express").Router();
const addOn = require("../controller/itemController.cjs");

router.post("/add",addOn);

module.exports = router