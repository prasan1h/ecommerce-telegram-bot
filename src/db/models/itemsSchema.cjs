const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});


const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  items: [itemSchema]
});


const foodSchema = new mongoose.Schema({
  categories: [categorySchema]
});

const FoodModel = mongoose.model('foods', foodSchema);
module.exports = FoodModel