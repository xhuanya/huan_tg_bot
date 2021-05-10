import { renameSync } from 'fs';
import { METHODS } from 'http';
import { Context, Telegraf, Telegram } from 'telegraf'
import { JsxEmit } from 'typescript'
import secret from '../secrets'
import Command from './Command'
import Event from './function/Event';
// const SensitiveWords = require("js-sensitivewords");
const bot = new Telegraf(MyBotbotToken)
// const sw = new SensitiveWords();
//注册事件
Event(bot);
bot.use(async (ctx, next) => {
  //注册命令
  await Command(ctx, bot);
  await next
})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('/menu', (ctx) => {
  // ctx.reply(JSON.stringify(ctx))
})
export default bot
