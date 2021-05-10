import { Context } from "telegraf";

export default async function (ctx: Context) {
    try {
        
        ctx.telegram.sendMessage(ctx.message?.from?.id||-1 , `
域名:${MyBotdomain}
hook路径:${MyBotwebhook}
Token:${MyBotbotToken}
    `, { parse_mode: 'HTML' })
        ctx.reply('bot信息已发送到私信!', { reply_to_message_id: ctx.message?.message_id });

    } catch (error) {
        ctx.reply('获取bot信息错误:' + error, { reply_to_message_id: ctx.message?.message_id });

    }
}
