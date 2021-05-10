import { Telegraf, Context } from "telegraf";
import fk from "./function/Command/fk";
import help from "./function/Command/help";
import { IPQuery, IPCallBack } from "./function/Command/ip";
import randomPictures from "./function/Command/randomPictures";
import { FilterSensitiveWord, AddSensitiveWord, DelSensitiveWord } from './function/Command/sensitiveWord'
import serverInfo from "./function/Command/serverInfo";
import start from "./function/Command/start";

function getTextParms(entities: any, message: string | null): string[] {
    let result: string[] = [];
    if (!message) {
        return result;
    }
    for (var i in entities) {
        result.push(message.substr(entities[i].offset, entities[i].length))
    }

    return result;
}

//注册tg方法
export default async function (ctx: Context, bot: Telegraf<Context>) {
    try {
        // ctx.reply(JSON.stringify(ctx));
        //消息实体
        let entities: any = ctx.message?.entities;
        let message = ctx.message?.text || null;
        //消息实体长度大于0 并且首条命令时bot_command
        if (entities?.length || 0 > 0 && entities[0].type == "bot_command" && !!message) {
            //取出命令
            let entitiesArr = getTextParms(entities, message);
            let parms: string[] = message?.split(" ") || [];
            switch (entitiesArr[0].toLowerCase()) {
                case "/start":
                    start(ctx);
                    break;
                case "/ip":
                    await IPQuery(ctx, parms);
                    break;
                case "/AddSensitiveWord":
                    await AddSensitiveWord(ctx, parms);
                    break;
                case "/DelSensitiveWord":
                    await DelSensitiveWord(ctx, parms);
                    break;
                case "/rimg":
                    await randomPictures(ctx, parms);
                    break;
                case "/fk":
                    await fk(ctx, parms);
                    break;
                case "/help":
                    await help(ctx);
                    break;
                case "/serverinfo":
                    await serverInfo(ctx);
                    break;
            }
        }
        //回调
        if (ctx.updateType == "callback_query") {
            let update: any = ctx.update;
            let cmdText = update.callback_query.data.split('|');
            switch (cmdText[0]) {
                case "IPQuery":
                    await IPCallBack(ctx, cmdText);
                    break;
            }
        }
        await FilterSensitiveWord(ctx);
    } catch (error) {
        ctx.reply("Command出现错误" + error)
    }

}