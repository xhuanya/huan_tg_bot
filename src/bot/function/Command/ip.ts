import { Context } from "telegraf";

/**
 * 查询IP
 * @param ip ip地址
 */
export const IPQuery = async function (ctx: Context, parms: string[]) {
    try {
        if (!parms[1]) {
            return ctx.replyWithHTML(`<b>Bot提醒：</b>您没有输入ip地址\r\n/ip IP地址`)
        }
        //检测ip正则
        let regIP: RegExp = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
        if (!regIP.test(parms[1])) {
            return ctx.replyWithHTML(`<b>Bot提醒：</b><del>${parms[1]}</del> 不是正确的IP地址`, { reply_to_message_id: ctx.message?.message_id })
        }
        let IpinfoData = await fetch("http://ip-api.com/json/" + parms[1] + "?lang=zh-CN", {
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "method": "GET",
        }).then(res => res.json()).catch(res => { ctx.reply("接口错误" + res, { reply_to_message_id: ctx.message?.message_id }) });

        if (IpinfoData.status == "success") {
            let template = `
国家编号：${IpinfoData.countryCode}
国家：${IpinfoData.country}
地区：${IpinfoData.regionName}
isp:${IpinfoData.isp}
时区:${IpinfoData.timezone}
`
            let res=await ctx.reply(template, { reply_to_message_id: ctx.message?.message_id ,reply_markup:{inline_keyboard:[[{text:"查看地图",callback_data:`IPQuery|${IpinfoData.lat}|${IpinfoData.lon}`}]]}});
        } else {
            return ctx.replyWithHTML(`<b>Bot提醒：</b>未查询到${parms[1]} IP的信息`, { reply_to_message_id: ctx.message?.message_id })
        }

    } catch (error) {
        ctx.reply("获取ip命令错误！！", { reply_to_message_id: ctx.message?.message_id });
    }
}
/**
 * 点击内联按钮回调
 * @param ctx 
 * @param parms 
 */
export const IPCallBack=async function (ctx: Context, parms: string[]) {
    let update:any=ctx.update;
    //清除按钮
    ctx.editMessageReplyMarkup()
    //发送地图位置
    ctx.replyWithLocation(parseInt(parms[1]),parseInt(parms[2]),{reply_to_message_id:update.callback_query.message.message_id})    
}