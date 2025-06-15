const express = require("express");
const router = express.Router();

const { foodsList, foodById, foodByCategory } = require("../controller/itemListController.cjs");

router.get("/foods", foodsList);
router.get('/foods/:id', foodById);
router.get('/foods/category/:categoryTitle', foodByCategory);

module.exports = router;