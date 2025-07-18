import Config from '@conf';
import { BotContext } from '@util';
import { Telegraf, session } from 'telegraf';
import { locales, typeormSession, userMiddleware } from './middlewares';
import RootRouter from './roots';
import { stage } from './wizards';

export class Textonka extends Telegraf<BotContext> {
  init() {
    this.use(session({ store: typeormSession() }));
    this.use(locales.middleware());
    this.use(stage.middleware());
    this.use(RootRouter);
    this.use(userMiddleware);

    this.start((ctx) =>
      ctx.reply('Привіт! Я Telegram бот через AWS Lambda Webhook!'),
    );
    this.telegram.setMyCommands([
      { command: 'start', description: 'Почати' },
      { command: 'menu', description: 'Меню' },
      { command: 'help', description: 'Допомога' },
    ]);

    if (Config.LAUNCH_STATE === 'local') {
      this.launch();
      console.log('Bot launched in polling mode');
    }
    process.once('SIGINT', () => this.stop('SIGINT'));
    process.once('SIGTERM', () => this.stop('SIGTERM'));
  }
}
