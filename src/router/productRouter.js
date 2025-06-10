
const router = require("express").Router();
const addOn = require("../controller/itemController");

router.post("/add-list",addOn);

module.exports = router