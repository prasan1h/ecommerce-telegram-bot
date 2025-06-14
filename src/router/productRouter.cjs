
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");


const addOn = require("../controller/itemController.cjs");
const { foodsList , foodById , foodByCategory} = require("../controller/itemListController.cjs");

router.get("/foods", (req,res) => {
    res.send("foods");
});
router.get('/foods/:id', foodById);
router.get('/foods/category/:categoryTitle', foodByCategory);
router.post("/add",addOn);


module.exports = router