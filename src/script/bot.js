const { Telegraf } = require("telegraf");
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);

const web_link = process.env.WEB_LINK;

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();