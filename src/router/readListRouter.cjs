const express = require("express");
const router = express.Router();

const { 
    foodsList, foodById, foodByCategory, foodDelete, foodDeleteWithMainId 
} = require("../controller/itemListController.cjs");

router.get("/foods", foodsList);
router.get('/foods/:id', foodById);
router.get('/foods/category/:categoryTitle', foodByCategory);

router.delete('/foods/:categoryId/:id', foodDelete);
router.delete("/foods/:mainDocId/:categoryId/:id", foodDeleteWithMainId);
router.get('/foods/:categoryId/:id', (req,res) => {
    res.json({message : "get foods/category/id"});
});

module.exports = router;