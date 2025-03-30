const { Telegraf } = require("telegraf");
const TOKEN = "7961772517:AAGUNv_xQHnA0kJL-ZgATtdHQXa_kHlh1Pc";
const bot = new Telegraf(TOKEN);

// const web_link = "https://celebrated-torte-184681.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();