import Config from '@conf';
import { Telegraf } from 'telegraf';

export class Textonka extends Telegraf {
  init() {
    if (Config.LAUNCH_STATE) {
      this.launch();
      console.log('Bot launched in polling mode');
    }
    this.start((ctx) => ctx.reply('Привіт! Я Telegram бот через AWS Lambda Webhook!'));
  }
}
