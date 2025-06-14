
const FoodModel = require("../db/models/itemsSchema.cjs");

const addOn = async (req, res) => {
  try {
    console.log("Incoming request ✅");
    console.log("Payload:", req.body);

    const { categories } = req.body;

    if (!categories || categories.length === 0) {
      console.log("❌ No category data");
      return res.status(400).json({ success: false, message: "No category data provided" });
    }

try {
  console.log("Data to save:", { categories });
  console.log("Type:", typeof categories);

  const itemTitles = [];
categories.forEach(category => {
  category.items.forEach(item => {
    itemTitles.push(item.title);
  });
});
console.log("Checking for item titles:", itemTitles);
  
 
 const existingFood = await FoodModel.findOne({
  'categories.items.title': { $in: itemTitles }
});
console.log("exist", existingFood);
  
  if (!existingFood) {
    const newFood = new FoodModel({ categories });
    console.log("About to save:", newFood);
    const result = await newFood.save();
    console.log("✅ Saved:", result);
  } else {
    console.log("❌ Food already exists:", existingFood);
  }
} catch (error) {
  console.error("Error:", error);
}

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: result
    });
  } catch (err) {
    console.error("🔥 Error in addOn:", err);
    return res.status(500).json({
      success: false,
      message: "Error adding item: internal server error"
    });
  }
};

module.exports = addOn;

