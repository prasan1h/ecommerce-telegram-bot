require("dotenv").config();

const { message } = require('telegraf/filters');
const { Telegraf } = require("telegraf");

const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(TOKEN);
const web_link = process.env.WEB_LINK;


bot.start((ctx) =>{
  console.log(ctx.chat);
  const f_name = ctx.chat.first_name;

  ctx.reply(`Welcome ${f_name} :) \n\n\ninformation : /info \n :-}`,
  {
    reply_markup: {
      keyboard: [
        [{ text: "tap to shop now", web_app: { url: web_link } }],
    ],
    },
  })
});

bot.command('info', (ctx) => ctx.reply('The E-commerce Telegram Bot (Mini App) is a chat-based shopping assistant that enables users to browse products, add items to their cart, and complete purchases—all within Telegram. Built using Telegraf.js for bot interactions and Node.js with Express for the backend, it integrates a web mini-app to provide a seamless UI for product selection and checkout. The bot fetches product data from MongoDB, processes orders, and can integrate payment gateways like Stripe or Razorpay for transactions. Users interact through text commands or inline buttons, while admins can manage inventory and orders via a backend panel. This lightweight solution is ideal for small businesses, offering a fast and intuitive e-commerce experience directly inside Telegram.'));

bot.on(message("text"), async msg => {
    await msg.reply("do not send message")
});

bot.launch();