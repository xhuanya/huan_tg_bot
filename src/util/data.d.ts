import Taro, { Context } from 'telegraf'
declare global {
  //kv存储
  const MyBotKV: KVNamespace;
  //webhook地址
  const MyBotwebhook:string;
  //域名 
  const MyBotdomain:string;
  //token
  const MyBotbotToken:string;
}


/**
 * 扩展
 */
declare module 'telegraf' {
  interface Context {
    /**
     * 状态管理
     */
    state: any,
  }  
}

export {};
