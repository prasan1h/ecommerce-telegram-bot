


const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

const prod = require("../router/productRouter.cjs");

require("./dbconn.cjs");


router.use(express.json());
router.use(bodyParser.json());
router.use(cors());

router.use("/list", prod);

router.get("/", (req, res) => {
    res.send("hello 8800");
});


module.exports = router;