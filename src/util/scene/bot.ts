import type { Context, Scenes } from 'telegraf';
import I18nContext from 'telegraf-i18n';
import { Subscription, User } from '../types';
import { SceneState, WizardSession } from './wizard';

export type Session = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type BotState = {
  user: User;
  subscription: Subscription;
};

export type BotContext = Context & {
  i18n: I18nContext;
  session: Session;
  scene: Scenes.SceneContextScene<BotContext, WizardSession> & {
    state: SceneState;
  };
  wizard: Scenes.WizardContextWizard<BotContext>;
  state: BotState;
};
