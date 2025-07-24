import type { Scenes } from 'telegraf';
import { PostSceneState, PostWizardName, PostWizardSession } from './wizards';

export type SceneState = PostSceneState;

export enum WizardType {
  post_wizard = PostWizardName,
}

export interface WizardSession extends Scenes.WizardSessionData {
  [WizardType.post_wizard]: PostWizardSession;
}
