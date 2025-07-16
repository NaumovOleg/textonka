import Config from '@conf';
import { SessionT } from '@util';
import { Telegraf, session, type Context } from 'telegraf';
import type {} from 'telegraf/session';
import type { Update } from 'telegraf/types';
import { locales, typeormSession, userMiddleware } from './middlewares';

interface MyContext<U extends Update = Update> extends Context<U> {
  session: SessionT;
}

export class Textonka extends Telegraf<MyContext> {
  init() {
    this.use(session({ store: typeormSession() }));
    this.use(locales.middleware());
    this.use(userMiddleware);
    if (Config.LAUNCH_STATE === 'local') {
      this.launch();
      console.log('Bot launched in polling mode');
    }

    this.on('text', (ctx) => {
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
    this.telegram.setMyCommands([
      { command: 'start', description: 'Почати' },
      { command: 'menu', description: 'Меню' },
      { command: 'help', description: 'Допомога' },
    ]);
    process.once('SIGINT', () => this.stop('SIGINT'));
    process.once('SIGTERM', () => this.stop('SIGTERM'));
  }
}
