import { Context } from "telegraf";

export default function (ctx: Context) {
    try {
        ctx.state.SensitiveWord = false;
        ctx.replyWithMarkdown(`
<b>=================幻bot=================</b>
bot功能
    1.ip查询
    2.敏感词屏蔽
bot说明
    1.本bot搭建在<a href="https://workers.cloudflare.com">[CloudFlare Worker]</a>
    2.本bot仅支持中文
      `, { parse_mode: 'HTML', disable_notification: true });
    } catch (error) {
        ctx.reply("欢迎错误" + error)
    }


}