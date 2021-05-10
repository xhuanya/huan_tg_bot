import { CheckIsAdmin } from "../../../util/BotUtil";
import { Context } from "telegraf";

const Mint = require('mint-filter').default
/**
 * 过滤上下文违禁词
 * @param ctx 
 */
export const FilterSensitiveWord = async function (ctx: Context) {
    try {
        //移除成员新增成员
        if(ctx.updateSubTypes[0]=="left_chat_member"||ctx.updateSubTypes[0]=="new_chat_members"){
            return ;
        }
        //跳过敏感词过滤
        if (typeof (ctx.state.SensitiveWord) !== "undefined" && ctx.state.SensitiveWord == false) {
            return;
        }
        const mint = new Mint(await MyBotKV.get("SensitiveWord" + ctx.chat?.id, "json") || [])
        let message: any = "";
        let sendMessageUserName: any = "";
        let chatId: number = -1;
        let messageID: number = -1;
        switch (ctx.updateType) {
            case "edited_message":
                message = ctx.editedMessage?.text;
                sendMessageUserName = ctx.editedMessage?.from?.username;
                chatId = ctx.editedMessage?.chat.id || -1;
                messageID = ctx.editedMessage?.message_id || -1;
                break;
            case "message":
                message = ctx.message?.text;
                sendMessageUserName = ctx.message?.from?.username;
                chatId = ctx.message?.chat.id || -1;
                messageID = ctx.message?.message_id || -1;
                break;
        }
        //过滤敏感字
        await mint.filter(message).then(async (res: any) => {
            if (!res.pass) {
                //  await ctx.telegram.deleteMessage(chatId,messageID);
                try {
                    let flag = await ctx.deleteMessage(messageID);
                    ctx.reply(`@${sendMessageUserName} 输入了违禁词已屏蔽\r\n${res.text}`);
                } catch (error) {
                    ctx.reply("敏感词回复错误" + error);
                }
            }
        })

    } catch (error) {
        ctx.reply("关键词过滤错误" + error)
    }

}
/**
 * 添加关键字
 * @param ctx 
 * @param parms 
 */
export const AddSensitiveWord = async function (ctx: Context, parms: string[]) {
    // 检查是否是管理员
    if (await CheckIsAdmin(ctx)) {
        return ctx.replyWithHTML(`<b>Bot提醒：</b>您不是管理员无法添加敏感词！`, { reply_to_message_id: ctx.message?.message_id })
    }
    ctx.state.SensitiveWord = false;
    if (!parms[1]) {
        return ctx.replyWithHTML(`<b>Bot提醒：</b>您没有输入敏感词\r\n/AddSensitiveWord 关键词`, { reply_to_message_id: ctx.message?.message_id })
    }

    let wordList: any = await MyBotKV.get("SensitiveWord" + ctx.chat?.id, "json") || [];
    let flag = true;
    wordList.forEach((item: any) => {
        if (item == parms[1]) {
            flag = false;
        }
    });
    if (flag) {
        wordList.push(parms[1])
        ctx.state.SensitiveWordRefresh = true;
        await MyBotKV.put("SensitiveWord" + ctx.chat?.id, JSON.stringify(wordList));
        ctx.replyWithHTML(`<b>Bot提醒：</b>敏感词添加成功!\r\n当前已有敏感词：${wordList.length}个`, { reply_to_message_id: ctx.message?.message_id })
    } else {
        ctx.replyWithHTML(`<b>Bot提醒：</b>当前敏感词已存在!\r\n当前已有敏感词：${wordList.length}个`, { reply_to_message_id: ctx.message?.message_id })
    }
}
/**
 * 删除敏感词
 * @param ctx 
 * @param parms 
 * @returns 
 */
export const DelSensitiveWord = async function (ctx: Context, parms: string[]) {
    // 检查是否是管理员
    if (await CheckIsAdmin(ctx)) {
        return ctx.replyWithHTML(`<b>Bot提醒：</b>您不是管理员无法删除敏感词！`, { reply_to_message_id: ctx.message?.message_id })
    }
    ctx.state.SensitiveWord = false;
    if (!parms[1]) {
        return ctx.replyWithHTML(`<b>Bot提醒：</b>您没有输入敏感词\r\n/DelSensitiveWord 关键词`, { reply_to_message_id: ctx.message?.message_id })
    }
    let wordList: any = await MyBotKV.get("SensitiveWord" + ctx.chat?.id, "json") || [];
    let flag = true;
    wordList.forEach((item: any) => {
        if (item == parms[1]) {
            flag = false;
        }
    });
    if (flag) {
        delete wordList[parms[1]];
        ctx.state.SensitiveWordRefresh = true;
        await MyBotKV.put("SensitiveWord" + ctx.chat?.id, JSON.stringify(wordList));
        ctx.replyWithHTML(`<b>Bot提醒：</b>已移除敏感词<b>${parms[1]}</b>\r\n当前已有敏感词：${wordList.length}个`, { reply_to_message_id: ctx.message?.message_id })

    } else {
        ctx.replyWithHTML(`<b>Bot提醒：</b>删除敏感词不存在！!\r\n当前已有敏感词：${wordList.length}个`, { reply_to_message_id: ctx.message?.message_id })
    }



}