const FoodModel = require("../db/models/itemsSchema.cjs");

const foodsList = async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching foods', error: err });
  }
};

const foodById =  async (req, res) => {
  try {
    const { id } = req.params;
    
    const food = await FoodModel.findById(id);
    
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food document not found'
      });
    }

    res.status(200).json(food);
    
  } catch (error) {
    console.error('Error fetching food by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

const foodByCategory =  async (req, res) => {
  try {
    const { categoryTitle } = req.params;
    
    const foods = await FoodModel.find({
      'categories.title': { $regex: categoryTitle, $options: 'i' }
    });
    
    if (!foods || foods.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No items found in category: ${categoryTitle}`
      });
    }

    // Filter to return only the matching categories
    const filteredFoods = foods.map(food => ({
      ...food.toObject(),
      categories: food.categories.filter(cat => 
        cat.title.toLowerCase().includes(categoryTitle.toLowerCase())
      )
    }));

    res.status(200).json(filteredFoods);
    
  } catch (error) {
    console.error('Error fetching foods by category:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

module.exports = { foodsList , foodById , foodByCategory};