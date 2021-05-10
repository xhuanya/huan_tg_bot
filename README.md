# CFWorker-TS-Telegraf-Boilerplate

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

Write your Telegram Bot with Typescript and Telegraf, and deliver all over the world with Cloudflare Workers.

## features

- `Typescript` Support
- `Telegraf` bot framework
- Host on `Cloudflare Workers` or running locally
- `Jest` test framework
- Debug locally with hot reload enabled
- `yarn webhook enable/disable` for quick switch between poll and webhook

## Quickstart

if your don't have degit:

```bash
> npm install -g degit
# or
> yarn global add degit
```

then:

```bash
> degit George-Miao/CFWorker-TS-Telegraf-Boilerplate <Your-Bot-Name>
> cd <Your-Bot-Name>
> yarn # or `npm i`
```

Fill in the `botToken` (if you don't have, create one from [@BotFather](http://t.me/BotFather)) in `src/secrets.ts`. For the other items, we can leave them blank until publish.

```typescript
// Filename: src/secrets.ts
export default {
  domain: '', // Domain for webhook
  webhook: '', // Webhook route. Use any URL-compatible character/string. Format: https://<domain>/webhook-<webhook>
  botToken: '', // Your telegram Bot Token get from @BotFather
}
```

Now your bot is ready to go:

```bash
> yarn launch # or `yarn dev` - they are identical
```

A simple echo bot is shipped with this boilerplate. All text will be echoed back by the bot.

## Publish

1. Fill in everything needed to publish a worker in `wrangler.toml` and `src/secrets.ts` first. (For more information, see [CloudFlare Docs](https://developers.cloudflare.com/workers/cli-wrangler/commands#publish))
2. `yarn pub` - This will automatically enable webhook and use `wrangler` to publish.

**Caution**: If you enabled webhook, local dev server _**may not**_ work as expected.

## Debug and Develop

Use `yarn launch/dev` will automatically disable webhook and run the bot locally. Otherwise you can use `wrangler tail` or `wrangler dev` to debug your bot running on `Workers`.

_NOT RECOMMENDED DUE TO THE COMPLEXITY AND INCONVENIENCE._ However, it is useful when you want to know what happened exactly in Cloudflare's server.

## Prerequisite

- `node`

- `yarn` or `npm`

- `wrangler`

## Yarn / NPM Scripts

#### `launch` / `dev`

Disable webhook and setup local debug environment with hot reload supported

#### `webhook`

Enable/disable webhook for telegram Bot API.

Usage: `yarn webhook enable/disable/status`

#### `pub`

Enable webhook and publish the bot to Cloudflare Workers

#### `test`

Run JestJS

#### `coverage`

Run coverage test

#### `build`

Build with `tsc` into `./dist`

#### `build:watch`

Same as `build`, with `-w` arg

#### `clear`

Delete `dist/`, `node_modules/`, `coverage/` and `worker/` with rimraf

## License

MIT
