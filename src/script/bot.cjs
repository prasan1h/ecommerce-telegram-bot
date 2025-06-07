


require("dotenv").config();
require("../db/dbconn");
require("../db/server");
const express = require("express");
const path = require("path");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");


const mongoose = require("mongoose");
const UserModel = require("../db/models/userSchema");

const app = express();


const TOKEN = process.env.BOT_TOKEN;
const WEB_LINK = process.env.WEB_LINK;
const PORT = process.env.BOT_PORT || 3000;
const DOMAIN = process.env.RENDER_EXTERNAL_URL;
const MONGO_URL = process.env.MONGO_URL;

if (!TOKEN || !WEB_LINK || !DOMAIN) {
  throw new Error("❌ Missing BOT_TOKEN, WEB_LINK, or RENDER_EXTERNAL_URL in environment variables");
}

const cleanDomain = DOMAIN.replace(/\/+$/, ""); 
const bot = new Telegraf(TOKEN);


app.use(express.static(path.join(__dirname, "../../dist")));


// mongoose.connect(MONGO_URL)
// .then(() => {console.log("mongo connected in bot server");})
// .catch((err) => {console.log("bot server mongo error",err)});



app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});


bot.start( async (ctx) => {
  const firstName = ctx.chat.first_name || "User";
  const data = ctx.chat;

  console.log(data);

  const { id, first_name, last_name, username } = ctx.from;
  const existingUser = await UserModel.findOne({id});

  if (!existingUser) {
    const newUser = new UserModel({
      id,
      first_name,
      last_name,
      username,
      type: ctx.chat.type,
    });
    await newUser.save();
  }


  ctx.reply(`Welcome ${firstName} 🙂\n\nInformation: /info\n:)`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛍️shop now", web_app: { url: WEB_LINK } }],
      ],
      resize_keyboard: true,
    },
  });
});

bot.command("info", (ctx) =>
  ctx.reply(
    `🛒 *E-commerce Telegram Bot (Mini App)*\n\nThis chat-based shopping assistant allows users to browse products, manage their cart, and checkout—all within Telegram. Built using Telegraf.js and Node.js with Express, the bot uses a web mini-app for seamless UI and integrates MongoDB for product/order data.\n\nKey Features:\n- Browse and shop\n- Add to cart\n- Admin inventory panel\n- Optional payment gateways\n\nIdeal for small businesses!`,
    { parse_mode: "Markdown" }
  )
);

bot.command("about", (ctx) => ctx.reply("about"));


bot.on(message("text"), async (ctx) => {
  await ctx.reply("🚫 Please use the provided buttons or commands.");
});


app.use(bot.webhookCallback("/"));
app.use(bot.webhookCallback("/payment"));
app.use(bot.webhookCallback("/about"));

bot.telegram.setWebhook(`${cleanDomain}/`)
  .then(() => console.log(`✅ Webhook set to ${cleanDomain}/`))
  .catch((err) => console.error("❌ Failed to set webhook:", err));


app.get("/", (req, res) => {
  res.send("🤖 Bot is running.");
});


app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});

