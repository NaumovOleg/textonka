import { type BotContext, WizardType } from '@util';
import { Composer } from 'telegraf';

export const startRoute = new Composer<BotContext>();

startRoute.command('start', async (ctx) => {
  return ctx.reply(ctx.i18n.t('welcome_message'), {
    parse_mode: 'HTML',
  });
});

startRoute.command('smartpost', async (ctx) => {
  await ctx.scene.enter(WizardType.smart_wizard);
});

startRoute.command('quit', async (ctx) => {
  await ctx.telegram.leaveChat(ctx.message.chat.id);
  await ctx.leaveChat();
});

startRoute.command('samples', async (ctx) => {
  const sample1 = ctx.i18n.t('before_after.samples.sample_1');
  const sample2 = ctx.i18n.t('before_after.samples.sample_2');
  const sample3 = ctx.i18n.t('before_after.samples.sample_2');
  return ctx.reply([sample1, sample2, sample3].join('\n\n\n\n'), {
    parse_mode: 'HTML',
  });
});
