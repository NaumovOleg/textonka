import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import {
  generateResponse,
  handleExtraSelection,
  selectEmotion,
  selectGoalHandler,
  selectStyle,
  selectTypeHandler,
  writeDetails,
  writeIdea,
} from './handlers';

export const PostWizard = new Scenes.WizardScene<BotContext>(
  WizardType.post_wizard,

  selectTypeHandler,
  selectGoalHandler,
  writeIdea,
  selectStyle,
  selectEmotion,
  writeDetails,
  handleExtraSelection,
  generateResponse,
);
