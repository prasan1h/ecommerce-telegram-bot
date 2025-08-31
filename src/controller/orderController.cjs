const OrderModel = require("../db/models/orderSchema.cjs");

function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ORD-${timestamp}-${random}`;
}

const createOrder = async (req, res) => {
  try {

    const orderId = generateOrderId();

    const { customer, address, contact, items, totalAmount, orderDate, status } = req.body;

    // Validate request body
    if (!customer || !address || !contact || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }
      const exists = await OrderModel.findOne({ orderId });
    if (exists) return res.status(400).json({ message: "Order ID already exists" });

    // Construct new order
    const newOrder = new OrderModel({
      orderId,
      customer,
      address,
      contact,
      items,
      totalAmount,
      orderDate: orderDate || Date.now(), // fallback if not provided
      status: status || "pending" // fallback if not provided
    });

    // Save to DB
    const savedOrder = await newOrder.save();
    return res.status(201).json({ success: true, message: "Order created successfully", data: savedOrder });
  } catch (err) {
    console.error("🔥 Error in createOrder:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};



const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().lean();
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("🔥 Error in getOrders:", err);
    return res.status(500).json({ success: false, message: "Error fetching orders: internal server error" });
  }
}

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("🔥 Error in deleteOrder:", err);
    return res.status(500).json({ success: false, message: "Error deleting order: internal server error" });
  }
}   

module.exports = { createOrder, getOrders, deleteOrder };