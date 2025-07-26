import Config from '@conf';
import { BotContext } from '@util';
import { Telegraf, session } from 'telegraf';
import {
  locales,
  subscriptionMiddleware,
  typeormSession,
  userMiddleware,
} from './middlewares';
import RootRouter from './roots';
import { stage } from './wizards';

export class Textonka extends Telegraf<BotContext> {
  init() {
    this.use(locales.middleware());
    this.use(session({ store: typeormSession() }));
    this.use(userMiddleware);
    this.use(subscriptionMiddleware);
    this.use(stage.middleware());
    this.use(RootRouter);

    this.telegram.setMyCommands([
      { command: 'smartpost', description: 'Start smart post' },
      { command: 'samples', description: 'Samples' },
      { command: 'help', description: 'Help' },
    ]);

    if (Config.LAUNCH_STATE === 'local') {
      this.launch();
      console.log('Bot launched in polling mode');
    }
    process.once('SIGINT', () => this.stop('SIGINT'));
    process.once('SIGTERM', () => this.stop('SIGTERM'));
  }
}
