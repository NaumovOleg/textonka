import { type I18nFlavor } from '@grammyjs/i18n';
import type { Context, Scenes } from 'telegraf';
import { WizardSession } from './wizard';

export type Session = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type BotContext = Context &
  I18nFlavor & {
    session: Session;
    scene: Scenes.SceneContextScene<BotContext, WizardSession>;
    wizard: Scenes.WizardContextWizard<BotContext>;
  };
