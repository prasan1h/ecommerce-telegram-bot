
const router = require("express").Router();
const addOn = require("../controller/itemController.cjs").default;

router.post("/list/add",addOn);

module.exports = router