const FoodModel = require("../db/models/itemsSchema");

const addOn = async (req,res) => {
  try {
    const data = req.body;
    const newFood = new FoodModel(data);
    await newFood.save();
    const result = await newFood.save();

    console.log("Saved:", result);
    return res.status(201).json({ success: true, message: "Item added successfully" });
  } catch (err) {
    console.error("Save error:", err); // 👈 this line is crucial
    return res.status(500).json({ success: false, message: "Error adding item : internal server error" });
  }
}

module.exports = addOn;