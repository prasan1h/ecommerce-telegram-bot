require("dotenv").config();

const { message } = require('telegraf/filters')
const { Telegraf } = require("telegraf");

const TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(TOKEN);
const web_link = process.env.WEB_LINK;

bot.start((ctx) =>{
  console.log(ctx.chat);
  const f_name = ctx.chat.first_name;

  ctx.reply(`Welcome ${f_name} :)`, {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
});

bot.on(message('text'), async (ctx) => {
  if(text != '/start'){
  return ctx.reply('👍')}
});



bot.launch();