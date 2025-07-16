import Config from '@conf';
import { Telegraf } from 'telegraf';

export class Textonka extends Telegraf {
  init() {
    if (Config.LAUNCH_STATE) {
      this.launch();
      console.log('Bot launched in polling mode');
    }
    this.command('quit', async (ctx) => {
      await ctx.telegram.leaveChat(ctx.message.chat.id);
      await ctx.leaveChat();
    });
    this.start((ctx) => ctx.reply('Привіт! Я Telegram бот через AWS Lambda Webhook!'));
  }
}
