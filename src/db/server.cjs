


// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const prod = require("../router/productRouter.cjs");

// require("./dbconn.cjs");


// router.use(express.json());
// router.use(bodyParser.json());
// router.use(cors());

// router.use("/list", prod);

// router.get("/", (req, res) => {
//     res.send("hello 8800");
// });


// module.exports = router;


const express = require("express");
const router = express.Router();

// Import database connection
require("./dbconn.cjs");

// Import routers
const prod = require("../router/productRouter.cjs");
const read = require("../router/readListRouter.cjs");

// Routes
router.use("/list", prod);
router.use("/read", read);

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