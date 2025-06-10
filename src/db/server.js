const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const prod = require("../router/productRouter");

require("../db/dbconn");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", prod);

// app.get("/",(req,res) => {
//     res.send("hello 8800");
// });

// app.listen(8800, () => {
//     console.log("8800 is working");
// });