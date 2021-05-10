import Telegraf, { Context } from "telegraf";
import FirstJoinGroup from "./Event/FirstJoinGroup";
const session = require('telegraf/session')

/**
 * 注册中间件
 * @param bot 
 */
export default function (bot: Telegraf<Context>) {
    bot.use(session());
    FirstJoinGroup(bot);
}