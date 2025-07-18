import type { Context, Scenes } from 'telegraf';
import { WizardSession } from './wizard';

export type Session = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface BotContext extends Context {
  session: Session;
  scene: Scenes.SceneContextScene<BotContext, WizardSession>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
