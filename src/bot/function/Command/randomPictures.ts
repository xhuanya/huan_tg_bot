import { Context } from "telegraf";
const imgageApi = "https://3650000.xyz/api/?type=json";

/**
 * 随机图片
 * @param ctx 
 * @param parms 
 */
export default async function (ctx: Context, parms: string[]) {
    try {

        if (!parms[1]) {
            return ctx.replyWithHTML(`
<b>Bot提醒：</b>您输入的命令有误!
看微博美女图
/rimg 1 
G图包(55000+图)，收集Instagram美女图，极少部分无人像
/rimg 2
cos美女图(10596张图)
/rimg 3
Mtcos美女图(14000+张图)，公共图床速度快
/rimg 5
随机美女图，10W+(部分露点)
/rimg 66
美腿
/rimg 7
40000张按Coser分类图片
/rimg 8
兔玩映画5000+图
/rimg 9`,{ reply_to_message_id: ctx.message?.message_id });
        }
        let imageData = await fetch(imgageApi + '&mode=' + parms[1]).then(res => res.json()).catch(error => {
            ctx.reply("获取图片错误:" + error);
        });
        if (imageData.code == 200&&!!imageData.url) {
            ctx.replyWithPhoto(imageData.url, { reply_to_message_id: ctx.message?.message_id });
        } else if(imageData.code == 200&&!imageData.url) {
            ctx.replyWithHTML(`
<b>Bot提醒：</b>您输入的命令有误!
看微博美女图
/rimg 1 
G图包(55000+图)，收集Instagram美女图，极少部分无人像
/rimg 2
cos美女图(10596张图)
/rimg 3
Mtcos美女图(14000+张图)，公共图床速度快
/rimg 5
随机美女图，10W+(部分露点)
/rimg 66
美腿
/rimg 7
40000张按Coser分类图片
/rimg 8
兔玩映画5000+图
/rimg 9`,{ reply_to_message_id: ctx.message?.message_id });
        }
    } catch (error) {
        ctx.reply("随机图片错误：" + error)
    }
}