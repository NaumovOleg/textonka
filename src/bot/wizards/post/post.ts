import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import {
  aiGenerationHandler,
  handleExtraSelection,
  selectEmotionHandler,
  selectGoalHandler,
  selectStyleHandler,
  selectTypeHandler,
  welcomeHandler,
  writeDetailsHandler,
  writeIdeaHandler,
} from './handlers';

export const PostWizard = new Scenes.WizardScene<BotContext>(
  WizardType.post_wizard,

  welcomeHandler,
  selectTypeHandler,
  selectGoalHandler,
  writeIdeaHandler,
  selectStyleHandler,
  selectEmotionHandler,
  writeDetailsHandler,
  handleExtraSelection,
  aiGenerationHandler,
);
