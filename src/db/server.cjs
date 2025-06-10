// 


const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

const prod = require("../router/productRouter.cjs");

require("./dbconn.cjs");

// Apply middleware to the router
router.use(express.json());
router.use(bodyParser.json());
router.use(cors());

router.use("/list", prod);

router.get("/", (req, res) => {
    res.send("hello 8800");
});

// Export the router instead of the app
module.exports = router;