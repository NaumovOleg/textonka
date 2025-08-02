import { type BotContext, COMMON_COMMANDS } from '@util';
import { Composer } from 'telegraf';

const composer = new Composer<BotContext>();

composer.command(COMMON_COMMANDS.start, async (ctx) => {
  ctx.session = {};
  return ctx.reply(ctx.i18n.t('welcome_message'), {
    parse_mode: 'HTML',
  });
});

composer.command(COMMON_COMMANDS.quit, async (ctx) => {
  ctx.session = {};
  await ctx.telegram.leaveChat(ctx.message.chat.id);
  await ctx.leaveChat();
});

composer.command(COMMON_COMMANDS.samples, async (ctx) => {
  ctx.session = {};
  const sample1 = ctx.i18n.t('before_after.samples.sample_1');
  const sample2 = ctx.i18n.t('before_after.samples.sample_2');
  const sample3 = ctx.i18n.t('before_after.samples.sample_2');
  return ctx.reply([sample1, sample2, sample3].join('\n\n\n\n'), {
    parse_mode: 'HTML',
  });
});

export const commonRouter = composer;
