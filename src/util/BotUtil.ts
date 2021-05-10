import { Context } from "telegraf";
import { ChatMember } from "telegraf/typings/telegram-types";

export const CheckIsAdmin = async function (ctx: Context) {
    return new Promise<boolean>(async function (resolve, reject) {
        try {
            let isAdmin = false;
            let adminList = await ctx.getChatAdministrators();
            adminList.forEach((item: ChatMember) => {
                if (item.user.id == ctx.from?.id) {
                    isAdmin = true;
                }
            });
            resolve(isAdmin);
        } catch (error) {
            reject(error)
        }
    })
}