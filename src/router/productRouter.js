
const router = require("express").Router();
const addOn = require("../controller/itemController");

router.post("/list/add",addOn);

module.exports = router