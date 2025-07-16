import Config from '@conf';
import { Telegraf, session, type Context } from 'telegraf';
import { typeormSession } from '@infrastructure';
import type { Update } from 'telegraf/types';

interface MyContext<U extends Update = Update> extends Context<U> {
  session: {
    count: number;
  };
}

export class Textonka extends Telegraf<MyContext> {
  init() {
    this.use(session({ store: typeormSession() }));
    if (Config.LAUNCH_STATE === 'local') {
      this.launch();
      console.log('Bot launched in polling mode');
    }

    this.on('text', (ctx) => {
      ctx.session.count = 1;
      console.log(ctx.from);
      console.log(ctx.session);
      ctx.reply(`You said: ${ctx.message.text}`);
    });
    this.command('quit', async (ctx) => {
      await ctx.telegram.leaveChat(ctx.message.chat.id);
      await ctx.leaveChat();
    });
    this.start((ctx) =>
      ctx.reply('Привіт! Я Telegram бот через AWS Lambda Webhook!'),
    );
    process.once('SIGINT', () => this.stop('SIGINT'));
    process.once('SIGTERM', () => this.stop('SIGTERM'));
  }
}
