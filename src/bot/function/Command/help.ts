import { Context } from "telegraf";

export default function (ctx:Context) {
    ctx.replyWithHTML(`
<b>幻Bot</b>
查询IP
    /ip IP
随机图片
    /rimg 模式(1:微博美女图,2:Instagram美女图,3:cos美女图,5:Mtcos美女图,66:随机美女图,7:美腿,8:Coser分类,9:兔玩映画)    
敏感词管理
    增加
    /AddSensitiveWord 敏感词
    删除
    /DelSensitiveWord 敏感词
反馈
    /fk 反馈内容
    `);
    
}