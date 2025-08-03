import {
  BotContext,
  COMMON_COMMANDS,
  WIZARD_COMMANDS,
  WizardType,
} from '@util';
import { Composer } from 'telegraf';
const composer = new Composer<BotContext>();

composer.command(WIZARD_COMMANDS.smartwizard, (ctx) => {
  ctx.session = {};
  return ctx.scene.enter(WizardType.smart_wizard);
});

composer.command(WIZARD_COMMANDS.quickwizard, (ctx) => {
  ctx.session = {};
  return ctx.scene.enter(WizardType.quick_wizard);
});

composer.hears(COMMON_COMMANDS.startSmartWizard, (ctx) => {
  return ctx.scene.enter(WizardType.smart_wizard);
});
composer.hears(COMMON_COMMANDS.startQuickWizard, (ctx) => {
  return ctx.scene.enter(WizardType.quick_wizard);
});

export const wizardRouter = composer;
