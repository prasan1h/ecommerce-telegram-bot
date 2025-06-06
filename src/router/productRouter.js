
const router = require("express").Router();
const addOn = require("../controller/itemController");

router.post("/add",addOn);

module.exports = router