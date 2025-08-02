import type { Scenes } from 'telegraf';
import {
  QuickWizardName,
  QuickWizardSession,
  SmartWizardName,
  SmartWizardSceneState,
  SmartWizardSession,
} from './wizards';

export type SceneState = SmartWizardSceneState;

export enum WizardType {
  smart_wizard = SmartWizardName,
  quick_wizard = QuickWizardName,
}

export interface WizardSession extends Scenes.WizardSessionData {
  [WizardType.smart_wizard]: SmartWizardSession;
  [WizardType.quick_wizard]: QuickWizardSession;
}
