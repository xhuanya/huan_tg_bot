import { join } from 'path'
import Telegraf, { Context } from 'telegraf'
import {MenuTemplate, MenuMiddleware, deleteMenuFromContext} from 'telegraf-inline-menu'
export default function(bot:Telegraf<Context>){

  // const menuTemplate = new MenuTemplate<Context>((ctx:any) => `Hey ${ctx.from.first_name}!`)
  // menuTemplate.interact('测试', 'a', {
  //   do: async (ctx:any) => ctx.reply('As am I!')
  // })
  // const menuMiddleware = new MenuMiddleware('/', menuTemplate)
  // bot.command('menu', ctx => menuMiddleware.replyToContext(ctx));
  // bot.use(menuMiddleware);
  var test=["宫花寂寞红",  "白头宫女在","闲坐说玄宗"]
  const menuTemplate = new MenuTemplate<Context>((ctx:any) => `你好啊 ${ctx.from.first_name}!`)
  menuTemplate.choose('寥落古行宫', test, {
    do: async (ctx, key) => {
    
        await ctx.answerCbQuery('认证成功')
        
        // await deleteMenuFromContext(ctx);  
     
      // You can also go back to the parent menu afterwards for some 'quick' interactions in submenus
      return false;
    }
  })
  const menuMiddleware = new MenuMiddleware('/', menuTemplate)
  bot.command('menu', ctx =>{
    return menuMiddleware.replyToContext(ctx);
  });
  bot.use(menuMiddleware);
  
}