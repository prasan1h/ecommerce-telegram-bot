


require("dotenv").config();
const express = require("express");
const path = require("path");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const app = express();

// === Load Environment Variables ===
const TOKEN = process.env.BOT_TOKEN;
const WEB_LINK = process.env.WEB_LINK;
const PORT = process.env.BOT_PORT || 3000;
const DOMAIN = process.env.RENDER_EXTERNAL_URL;

if (!TOKEN || !WEB_LINK || !DOMAIN) {
  throw new Error("❌ Missing BOT_TOKEN, WEB_LINK, or RENDER_EXTERNAL_URL in environment variables");
}

const cleanDomain = DOMAIN.replace(/\/+$/, ""); // remove trailing slash if any
const bot = new Telegraf(TOKEN);

// === Serve Vite build ===
app.use(express.static(path.join(__dirname, "../../dist")));
app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

// === Telegram Bot Commands ===
bot.start((ctx) => {
  const firstName = ctx.chat.first_name || "User";
  console.log(ctx.chat);

  ctx.reply(`Welcome ${firstName} 🙂\n\nInformation: /info\n:)`, {
    reply_markup: {
      keyboard: [
        [{ text: "🛍️ Tap to shop now", web_app: { url: WEB_LINK } }],
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

// Reject plain messages
bot.on(message("text"), async (ctx) => {
  await ctx.reply("🚫 Please use the provided buttons or commands.");
});

// === Webhook setup ===
app.use(bot.webhookCallback("/"));

bot.telegram.setWebhook(`${cleanDomain}/`)
  .then(() => console.log(`✅ Webhook set to ${cleanDomain}/`))
  .catch((err) => console.error("❌ Failed to set webhook:", err));

// === Health Check (Optional) ===
app.get("/", (req, res) => {
  res.send("🤖 Bot is running.");
});

// === Start server ===
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});

// === Do NOT call bot.stop() — webhook mode doesn't use launch/stop ===
