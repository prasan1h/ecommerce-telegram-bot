const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { bot, router } = require("./src/script/bot.cjs");
const server = require("./src/db/server.cjs");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
    res.json({ message: "Server is running", status: "ok" });
});

app.use("/server",server);
app.use("/bot", router);


app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
});


const port = process.env.BOT_PORT || 3000;
app.listen(port, () => {
  console.log(`Combined server running on port ${port}`);
});