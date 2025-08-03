import {
  BotContext,
  QUICK_WIZARD_START_ROUTES,
  SMART_WIZARD_START_ROUTES,
  WizardType,
} from '@util';
import { Composer } from 'telegraf';
const composer = new Composer<BotContext>();

composer.hears(SMART_WIZARD_START_ROUTES, (ctx) => {
  return ctx.scene.enter(WizardType.smart_wizard);
});
composer.hears(QUICK_WIZARD_START_ROUTES, (ctx) => {
  return ctx.scene.enter(WizardType.quick_wizard);
});

export const wizardRouter = composer;
