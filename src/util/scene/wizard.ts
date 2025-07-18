import type { Scenes } from 'telegraf';
import { PostWizardName, PostWizardSession } from './wizards';

export enum WizardType {
  post_wizard = PostWizardName,
}

export interface WizardSession extends Scenes.WizardSessionData {
  [WizardType.post_wizard]: PostWizardSession;
}
