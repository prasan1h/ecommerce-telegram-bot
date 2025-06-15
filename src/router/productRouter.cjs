
const express = require("express");
const router = express.Router();

const addOn = require("../controller/itemController.cjs");
// const { foodsList, foodById, foodByCategory } = require("../controller/itemListController.cjs");

// Fixed: Use the actual controller instead of sending "foods"
// router.get("/foods", foodsList);
// router.get('/foods/:id', foodById);
// router.get('/foods/category/:categoryTitle', foodByCategory);
router.post("/add", addOn);

module.exports = router;