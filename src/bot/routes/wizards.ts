import { BotContext, WizardType } from '@util';
import { Composer } from 'telegraf';
const composer = new Composer<BotContext>();

composer.command('smartpost', async (ctx) => {
  ctx.session = {};
  await ctx.scene.enter(WizardType.smart_wizard);
});

export const wizardRouter = composer;
