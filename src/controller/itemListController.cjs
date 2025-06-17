const FoodModel = require("../db/models/itemsSchema.cjs");

const foodsList = async (req, res) => {
  try {
    const foods = await FoodModel.find().lean();
    res.status(200).json(foods);
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

const foodDelete = async (req, res) => {
  try {
    const { categoryId, id: itemId } = req.params;
    
    console.log('Delete request - categoryId:', categoryId, 'itemId:', itemId);
    
    // First, find the document that contains the category
    const foodDoc = await FoodModel.findOne({ 'categories._id': categoryId });
    if (!foodDoc) {
      console.log('Category not found with ID:', categoryId);
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    console.log('Found document:', foodDoc._id);
    
    // Find the specific category
    const category = foodDoc.categories.find(cat => cat._id.toString() === categoryId);
    if (!category) {
      console.log('Category not found in document');
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    console.log('Found category:', category.title);
    
    // Find the item to delete
    const itemToDelete = category.items.find(item => item._id.toString() === itemId);
    
    if (!itemToDelete) {
      console.log('Item not found with ID:', itemId);
      console.log('Available items:', category.items.map(item => ({ id: item._id.toString(), title: item.title })));
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    console.log('Found item to delete:', itemToDelete.title);
    
    // Remove the item using MongoDB's $pull operator
    const result = await FoodModel.findOneAndUpdate(
      { 'categories._id': categoryId },
      { $pull: { 'categories.$.items': { _id: itemId } } },
      { new: true }
    );
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Failed to delete item'
      });
    }
    
    console.log('Item deleted successfully');
    
    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: {
        deletedItem: itemToDelete,
        categoryId: categoryId,
        itemId: itemId
      }
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
};

const foodDeleteWithMainId = async (req, res) => {
  try {
    const { mainDocId, categoryId, id: itemId } = req.params;
    
    console.log('Delete request - mainDocId:', mainDocId, 'categoryId:', categoryId, 'itemId:', itemId);
    
    // Method 1: Find by main document ID first
    const foodDoc = await FoodModel.findById(mainDocId);
    if (!foodDoc) {
      return res.status(404).json({
        success: false,
        message: 'Main document not found'
      });
    }
    
    // Find the specific category
    const category = foodDoc.categories.find(cat => cat._id.toString() === categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Find the item to delete
    const itemToDelete = category.items.find(item => item._id.toString() === itemId);
    if (!itemToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    // Delete using main document ID and category ID
    const result = await FoodModel.findByIdAndUpdate(
      mainDocId,
      { $pull: { 'categories.$[category].items': { _id: itemId } } },
      { 
        arrayFilters: [{ 'category._id': categoryId }],
        new: true 
      }
    );
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Failed to delete item'
      });
    }
    
    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: {
        deletedItem: itemToDelete,
        mainDocId: mainDocId,
        categoryId: categoryId,
        itemId: itemId
      }
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
};


module.exports = { foodsList , foodById , foodByCategory , foodDelete , foodDeleteWithMainId};