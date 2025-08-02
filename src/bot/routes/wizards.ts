import { BotContext, WIZARD_COMMANDS, WizardType } from '@util';
import { Composer } from 'telegraf';
const composer = new Composer<BotContext>();

composer.command(WIZARD_COMMANDS.smartwizard, async (ctx) => {
  ctx.session = {};
  await ctx.scene.enter(WizardType.smart_wizard);
});

composer.command(WIZARD_COMMANDS.quickwizard, async (ctx) => {
  ctx.session = {};
  await ctx.scene.enter(WizardType.quick_wizard);
});

export const wizardRouter = composer;
