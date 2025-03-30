require("dotenv").config();
const { Telegraf } = require("telegraf");
const TOKEN = process.env.TOKEN;

// TOKEN="7961772517:AAGUNv_xQHnA0kJL-ZgATtdHQXa_kHlh1Pc"
const bot = new Telegraf(TOKEN);

if (!TOKEN) {
  throw new Error(" Bot Token is missing! Set it in the .env file.");
}

// const web_link = process.env.WEB_LINK;
const web_link = "https://ecommercetelegrambothere.netlify.app/"

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

// bot.start((ctx) => 
//   ctx.reply("welcome")
// );

bot.launch();