import { Context } from "telegraf";

export default async function (ctx: Context, parms: string[]) {
    try {
        const fkList: any = await MyBotKV.get('fkList', 'json') || [];
        ctx.state.SensitiveWord=false;
        if (!parms[1]) {
            return ctx.replyWithHTML(`
<b>Bot提醒：</b>您输入的命令有误!
/fk 反馈内容
`, { reply_to_message_id: ctx.message?.message_id });
        }
        if (fkList.length == 0) {
            return ctx.replyWithHTML(`<b>Bot提醒：</b>不用反馈了tnnd作者没有设置反馈接收人!`, { reply_to_message_id: ctx.message?.message_id });
        }
        fkList.forEach(async(item: string) => {
            let time=new Date(ctx.message?.date||-1);
           let result=await ctx.telegram.sendMessage(item, 
`===================幻bot反馈===================
聊天组:${ctx.chat?.title}-${ctx.chat?.id}
反馈人：${ctx.message?.from?.username}-${ctx.message?.from?.id}
反馈时间：${time.toJSON()}
反馈内容：
            ${parms[1]}`
            ,{parse_mode:'HTML'});
            // ctx.reply(JSON.stringify(result));
        });
    } catch (error) {
        return ctx.replyWithHTML(`<b>Bot提醒：</b>反馈失败,请重试! `, { reply_to_message_id: ctx.message?.message_id });
    }
}