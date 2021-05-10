import secrets from '../secrets'
import { Telegraf } from 'telegraf'

const greenLog = (txt: string) => console.log(`\x1b[32m[+]\x1b[0m ${txt}`)
const cmds = ['enable', 'disable', 'status']
;(async () => {
  console.log()
  greenLog('==== Webhook helper ====')

  const cmd = process.argv[2]
  if (!cmds.includes(cmd))
    throw new Error(
      '\tCommand error. Usage: `yarn/npm run webhook enable/disable/status`\n\n',
    )

  const bot = new Telegraf(secrets.botToken)
  const webhookInfo = await bot.telegram.getWebhookInfo()

  if (webhookInfo.url) greenLog(`Found current webhook: ${webhookInfo.url}`)

  if (cmd == 'enable') {
    const webhook = `https://${secrets.domain}/webhook-${secrets.webhook}`
    if (webhook == webhookInfo.url) greenLog('Webhook not changed. Escaped.')
    else {
      await bot.telegram.setWebhook(webhook)
      greenLog(`Done. Webhook set to ${webhook}`)
    }
  } else if (cmd == 'disable') {
    if (!webhookInfo.url) greenLog('No webhook set. Escaped.')
    else {
      await bot.telegram.deleteWebhook()
      greenLog('Done. Webhook disabled.')
    }
  } else if (cmd == 'status') {
    console.log(webhookInfo)
    console.log()
    if (!webhookInfo.url)
      greenLog('No webhook set yet. Use `yarn/npm run webhook enable` to set.')
  }
})().then()
