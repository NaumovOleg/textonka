import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import { welcomeHandler } from './handlers';

export const QuickWizard = new Scenes.WizardScene<BotContext>(
  WizardType.quick_wizard,

  welcomeHandler,
);
