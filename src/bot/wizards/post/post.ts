import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import {
  handleExtraSelection,
  renderChecklist,
  selectEmotion,
  selectGoalHandler,
  selectStyle,
  selectTypeHandler,
  writeIdea,
} from './handlers';

export const PostWizard = new Scenes.WizardScene<BotContext>(
  WizardType.post_wizard,

  selectTypeHandler,
  selectGoalHandler,
  writeIdea,
  selectStyle,
  selectEmotion,
  renderChecklist,
  handleExtraSelection,
);
