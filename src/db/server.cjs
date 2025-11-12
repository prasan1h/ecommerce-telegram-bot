const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());

require("./dbconn.cjs");


const prod = require("../router/productRouter.cjs");
const read = require("../router/readListRouter.cjs");
const del = require("../router/deleteListRouter.cjs");
const order = require("../router/orderRouter.cjs");

router.use("/list", prod);
router.use("/read", read);
router.use("/del", del);
router.use("/order", order);


router.get("/", (req, res) => {
    res.json({ 
        message: "Server is running in backend", 
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

router.get("/health", (req, res) => {
    res.json({ 
        message: "Database server is healthy", 
        status: "connected"
    });
});

module.exports = router;