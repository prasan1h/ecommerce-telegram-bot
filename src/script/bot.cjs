// 



require("dotenv").config();
const express = require('express');
const { Telegraf } = require("telegraf");
const { message } = require('telegraf/filters');

const app = express();

const TOKEN = process.env.BOT_TOKEN;
const WEB_LINK = process.env.WEB_LINK;
const PORT = process.env.BOT_PORT || 3000;

if (!TOKEN || !WEB_LINK) {
  throw new Error("Missing BOT_TOKEN or WEB_LINK in environment variables");
}

const bot = new Telegraf(TOKEN);

// Start command
bot.start((ctx) => {
  const firstName = ctx.chat.first_name || "User";
  ctx.reply(
    `Welcome ${firstName} 🙂\n\nInformation: /info\nCart: /cart`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "🛍️ Tap to shop now", web_app: { url: WEB_LINK } }],
        ],
        resize_keyboard: true
      }
    }
  );
});

// Info command
bot.command('info', (ctx) =>
  ctx.reply(
    `🛒 *E-commerce Telegram Bot (Mini App)*\n\nThis chat-based shopping assistant allows users to browse products, manage their cart, and checkout—all within Telegram. Built using Telegraf.js and Node.js with Express, the bot uses a web mini-app for seamless UI and integrates MongoDB for product/order data.\n\nKey Features:\n- Browse and shop\n- Add to cart\n- Admin inventory panel\n- Optional payment gateways\n\nIdeal for small businesses!`,
    { parse_mode: "Markdown" }
  )
);

// Reject plain messages
bot.on(message("text"), async (ctx) => {
  await ctx.reply("🚫 Please use the provided buttons or commands.");
});

// Launch the bot
bot.launch()
  .then(() => console.log("🤖 Bot launched successfully"))
  .catch((err) => console.error("Bot launch error:", err));

// Basic Express route
app.get("/", (req, res) => {
  res.send("🤖 Bot is running.");
});

app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
