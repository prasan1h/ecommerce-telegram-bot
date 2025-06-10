// const FoodModel = require("../db/models/itemsSchema");

// const addOn = async (req,res) => {
//   try {
//     const data = req.body;
//     const newFood = new FoodModel(data);
//     await newFood.save();
//     const result = await newFood.save();

//     console.log("Saved:", result);
//     return res.status(201).json({ success: true, message: "Item added successfully" });
//   } catch (err) {
//     console.error("Save error:", err);
//     return res.status(500).json({ success: false, message: "Error adding item : internal server error" });
//   }
// }

// module.exports = addOn;


import FoodModel from "../db/models/itemsSchema";

const addOn = async (req, res) => {
  try {
    console.log("Incoming request ✅");
    console.log("Payload:", req.body);

    const { categories } = req.body;

    if (!categories || categories.length === 0) {
      console.log("❌ No category data");
      return res.status(400).json({ success: false, message: "No category data provided" });
    }

    const newFood = new FoodModel({ categories });
    console.log("Saving to DB...");

    const result = await newFood.save();

    console.log("✅ Saved:", result);

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

export default addOn;

