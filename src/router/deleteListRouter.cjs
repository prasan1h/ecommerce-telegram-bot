const express = require("express");
const router = express.Router();

const { 
    foodDelete, foodDeleteWithMainId 
} = require("../controller/itemListController.cjs");

router.delete('/foods/:categoryId/:id', foodDelete);
router.delete("/foods/:mainDocId/:categoryId/:id", foodDeleteWithMainId);
router.get('/foods/:categoryId/:id', (req,res) => {
    res.json({message : "get foods/category/id"});
});

module.exports = router;