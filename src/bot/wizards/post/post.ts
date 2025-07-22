import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import {
  handleExtraSelection,
  selectEmotion,
  selectExtraOptions,
  selectGoalHandler,
  selectStyle,
  selectTypeHandler,
  writeIdea,
} from './handlers';

export const PostWizard = new Scenes.WizardScene<BotContext>(
  WizardType.post_wizard,
  selectExtraOptions,
  handleExtraSelection,
  selectTypeHandler,

  selectGoalHandler,
  writeIdea,
  selectStyle,
  selectEmotion,
);
