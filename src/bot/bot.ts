import Config from '@conf';
import { BotContext, WIZARD_COMMANDS } from '@util';
import { Middleware, Telegraf, session } from 'telegraf';
import {
  locales,
  subscriptionMiddleware,
  typeormSession,
  userMiddleware,
} from './middlewares';
import {
  commonRouter,
  paymentsRouter,
  subscriptionRouter,
  wizardRouter,
} from './routes';
import { stage } from './wizards';

export class Textonka extends Telegraf<BotContext> {
  initialized = false;

  init() {
    this.initMiddlewares([
      locales.middleware(),
      session({ store: typeormSession() }),
      userMiddleware,
      subscriptionMiddleware,
    ]);
    this.initRoutes([commonRouter, subscriptionRouter, paymentsRouter]);
    this.initWizards([stage.middleware(), wizardRouter]);

    this.initCommands();

    if (Config.LAUNCH_STATE === 'local') {
      this.launch();
      console.log('Bot launched in polling mode');
    }
    process.once('SIGINT', () => this.stop('SIGINT'));
    process.once('SIGTERM', () => this.stop('SIGTERM'));
    this.initialized = true;

    this.catch((err, ctx) => {
      console.error(err);
      console.error(
        '❌ Unhandled error occurred:',
        JSON.stringify(err, null, 2),
      );
      console.error('📩 Context info:', ctx.update);

      ctx.reply?.('Произошла ошибка. Попробуйте позже.');
    });
  }

  initMiddlewares(middlewares: Middleware<BotContext>[]) {
    this.use(...middlewares);
  }

  initWizards(wizards: Middleware<BotContext>[]) {
    this.use(...wizards);
  }

  initRoutes(routes: Middleware<BotContext>[]) {
    this.use(...routes);
  }

  initCommands() {
    this.telegram.setMyCommands([
      {
        command: WIZARD_COMMANDS.smartwizard,
        description: 'Start smart wizard',
      },
      {
        command: WIZARD_COMMANDS.quickwizard,
        description: 'Start quick wizard',
      },
      { command: 'subscription', description: 'Subscription' },
      { command: 'samples', description: 'Samples' },
      { command: 'help', description: 'Help' },
    ]);
  }
}
