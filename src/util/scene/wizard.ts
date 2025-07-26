import type { Scenes } from 'telegraf';
import {
  SmartWizardName,
  SmartWizardSceneState,
  SmartWizardSession,
} from './wizards';

export type SceneState = SmartWizardSceneState;

export enum WizardType {
  smart_wizard = SmartWizardName,
}

export interface WizardSession extends Scenes.WizardSessionData {
  [WizardType.smart_wizard]: SmartWizardSession;
}
