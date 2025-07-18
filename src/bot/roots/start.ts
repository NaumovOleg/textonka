import { type BotContext, WizardType } from '@util';
import { Composer } from 'telegraf';

export const startRoute = new Composer<BotContext>();

startRoute.command('start', async (ctx) => {
  await ctx.scene.enter(WizardType.post_wizard);
});

startRoute.command('quit', async (ctx) => {
  await ctx.telegram.leaveChat(ctx.message.chat.id);
  await ctx.leaveChat();
});
