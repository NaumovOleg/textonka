import type { Scenes } from 'telegraf';
import { PostWizardSession } from './wizards';

export enum WizardType {
  'post' = 'post',
}

export interface WizardSession extends Scenes.WizardSessionData {
  [WizardType.post]: PostWizardSession;
}
