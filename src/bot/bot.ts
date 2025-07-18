import Config from '@conf';
import { BotContext, WizardType } from '@util';
import { Telegraf, session } from 'telegraf';
import { locales, typeormSession, userMiddleware } from './middlewares';
import { stage } from './wizards';

export class Textonka extends Telegraf<BotContext> {
  init() {
    this.use(session({ store: typeormSession() }));
    this.use(locales);
    this.use(stage.middleware());
    this.use(userMiddleware);
    if (Config.LAUNCH_STATE === 'local') {
      this.launch();
      console.log('Bot launched in polling mode');
    }

    this.command('quit', async (ctx) => {
      await ctx.telegram.leaveChat(ctx.message.chat.id);
      await ctx.leaveChat();
    });
    this.command('start', async (ctx) => {
      await ctx.scene.enter(WizardType.post_wizard);
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
