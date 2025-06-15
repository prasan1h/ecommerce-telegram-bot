const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { bot, router } = require("./src/script/bot.cjs");
// const {listings} = require("./src/router/productRouter.cjs");
const server = require("./src/db/server.cjs");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use("/bot", router);
app.use("/server",server);
// app.use("/listings", listings);

const port = process.env.BOT_PORT || 3000;
app.listen(port, () => {
  console.log(`Combined server running on port ${port}`);
});