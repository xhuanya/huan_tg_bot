import { Application, Router } from '@cfworker/web'
import createTelegrafMiddware from 'cfworker-middware-telegraf'
import secret from './secrets'

import bot from './bot'
const router = new Router()
router.post(`/webhook-${MyBotwebhook}`, createTelegrafMiddware(bot))
router.get("/", async ({ res }) => {
  res.body = `power by xhuan`;

})
router.get("/firstInitBot", async ({ res }) => {
  //设置bothook
  const webhook = `https://${MyBotdomain}/webhook-${MyBotwebhook}`
  await bot.telegram.deleteWebhook()
  let result = await bot.telegram.setWebhook(webhook);
  res.body = result;
  //反馈的chatid
  var fkList = ["1561082959"];
  await MyBotKV.put('fkList', JSON.stringify(fkList))

})
new Application().use(router.middleware).listen()


