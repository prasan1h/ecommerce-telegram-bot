



// require("dotenv").config();
// const express = require('express');
// const path = require('path');

// const { Telegraf } = require("telegraf");
// const { message } = require('telegraf/filters');


// const app = express();

// app.use(express.static(path.join(__dirname, 'dist')));

// const TOKEN = process.env.BOT_TOKEN;
// const WEB_LINK = process.env.WEB_LINK;
// const PORT = process.env.BOT_PORT || 3000;
// const DOMAIN = process.env.RENDER_EXTERNAL_URL;

// if (!TOKEN || !WEB_LINK) {
//   throw new Error("Missing BOT_TOKEN or WEB_LINK in environment variables");
// }

// const bot = new Telegraf(TOKEN);

// // Start command
// bot.start((ctx) => {
//   const firstName = ctx.chat.first_name || "User";
//   ctx.reply(
//     `Welcome ${firstName} 🙂\n\nInformation: /info\n:)`,
//     {
//       reply_markup: {
//         keyboard: [
//           [{ text: "🛍️ Tap to shop now", web_app: { url: WEB_LINK } }],
//         ],
//         resize_keyboard: true
//       }
//     }
//   );
// });

// // Info command
// bot.command('info', (ctx) =>
//   ctx.reply(
//     `🛒 *E-commerce Telegram Bot (Mini App)*\n\nThis chat-based shopping assistant allows users to browse products, manage their cart, and checkout—all within Telegram. Built using Telegraf.js and Node.js with Express, the bot uses a web mini-app for seamless UI and integrates MongoDB for product/order data.\n\nKey Features:\n- Browse and shop\n- Add to cart\n- Admin inventory panel\n- Optional payment gateways\n\nIdeal for small businesses!`,
//     { parse_mode: "Markdown" }
//   )
// );





// bot.command('checkout', 
//   async (ctx) => {
//     const webAppData = ctx.webAppData?.data;
  
//     if (webAppData) {
//       const cart = JSON.parse(webAppData);
  
//       // Respond to user with cart summary or confirmation
//       let message = '🧾 Your order:\n\n';
//       cart.forEach((item, idx) => {
//         message += `${idx + 1}. ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
//       });
  
//       const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//       message += `\n💰 Total: ₹${total}`;
  
//       await ctx.reply(Checkout);
//     }
//   }
// );














// // Reject plain messages
// bot.on(message("text"), async (ctx) => {
//   await ctx.reply("🚫 Please use the provided buttons or commands.");
// });


// app.use(bot.webhookCallback("/"));

// bot.telegram.setWebhook(`${DOMAIN}/`)
//   .then(() => console.log(`✅ Webhook set to ${DOMAIN}/`))
//   .catch(err => console.error("❌ Failed to set webhook:", err));









//   function userData(ctx) {
//     return ctx.chat;
//   }
  

  







// // Basic Express route

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// // Root route for checking if the bot is running
// app.get("/", (req, res) => {
//   res.send("🤖 Bot is running.");
// });



// module.exports = { userData };

// app.listen(PORT, () => {
//   console.log(`🌐 Server is running on port ${PORT}`);
// });
















require("dotenv").config();
const express = require('express');
const path = require('path');
const { Telegraf } = require("telegraf");
const { message } = require('telegraf/filters');

const app = express();

app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from React's build directory

const TOKEN = process.env.BOT_TOKEN;
const WEB_LINK = process.env.WEB_LINK;
const PORT = process.env.BOT_PORT || 3000;
const DOMAIN = process.env.RENDER_EXTERNAL_URL;

if (!TOKEN || !WEB_LINK) {
  throw new Error("Missing BOT_TOKEN or WEB_LINK in environment variables");
}

const bot = new Telegraf(TOKEN);

// Start command for bot
bot.start((ctx) => {
  const firstName = ctx.chat.first_name || "User";
  ctx.reply(
    `Welcome ${firstName} 🙂\n\nInformation: /info\n:)`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "🛍️ Tap to shop now", web_app: { url: WEB_LINK } }],
        ],
        resize_keyboard: true,
      },
    }
  );
});

// Info command for bot
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


// Serve React's index.html for all other routes (frontend routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Set up webhook for Telegram bot
app.use(bot.webhookCallback("/"));
bot.telegram.setWebhook(`${DOMAIN}/`)
  .then(() => console.log(`✅ Webhook set to ${DOMAIN}/`))
  .catch(err => console.error("❌ Failed to set webhook:", err));

// Start the Express server
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
