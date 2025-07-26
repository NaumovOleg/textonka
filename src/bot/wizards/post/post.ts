import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import {
  handleExtraSelection,
  languageHandler,
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
  languageHandler,
  selectTypeHandler,
  writeIdeaHandler,
  writeDetailsHandler,
  selectGoalHandler,
  selectStyleHandler,
  selectEmotionHandler,
  handleExtraSelection,
);
