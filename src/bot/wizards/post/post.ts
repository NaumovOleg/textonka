import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import {
  ai,
  handleExtraSelection,
  selectEmotion,
  selectGoalHandler,
  selectStyleHandler,
  selectTypeHandler,
  writeDetails,
  writeIdea,
} from './handlers';

export const PostWizard = new Scenes.WizardScene<BotContext>(
  WizardType.post_wizard,

  selectTypeHandler,
  selectGoalHandler,
  writeIdea,
  selectStyleHandler,
  selectEmotion,
  writeDetails,
  handleExtraSelection,
  ai,
);
