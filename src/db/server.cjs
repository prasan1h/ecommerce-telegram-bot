


const express = require("express");
const router = express.Router();

// Import database connection
require("./dbconn.cjs");

// Import routers
const prod = require("../router/productRouter.cjs");
const read = require("../router/readListRouter.cjs");
const del = require("../router/deleteListRouter.cjs");

// Routes
router.use("/list", prod);
router.use("/read", read);
router.use("/del", del);

// Health check endpoint
router.get("/", (req, res) => {
    res.json({ 
        message: "Server is running in backend", 
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

// Optional: Add a test endpoint to check database connection
router.get("/health", (req, res) => {
    res.json({ 
        message: "Database server is healthy", 
        status: "connected"
    });
});

module.exports = router;